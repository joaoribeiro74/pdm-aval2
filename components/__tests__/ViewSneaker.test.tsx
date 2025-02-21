import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ViewSneaker from "../ViewSneaker";
import Sneaker from "../../types/Sneaker";
import { ThemeProvider } from "@/context/ThemeContext";

// Mock do CardSneaker para evitar renderização
jest.mock("../CardSneaker", () => {
  return () => <></>; // Retorna um componente vazio, apenas para evitar o teste do CardSneaker
});

jest.mock('react-native/Libraries/Animated/Animated', () => {
    const RealAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
    return {
      ...RealAnimated,
      View: 'View', // Isso substitui o componente Animated.View por um componente simples View
    };
});

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => {
    return ({ children }: { children: React.ReactNode }) => <>{children}</>; // Define o tipo para children
});

// Função auxiliar para renderizar com o ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ViewSneaker", () => {
  const mockSneaker: Sneaker = {
    id: "1",
    name: "Nike Air Max",
    brand: "Nike",
    size: 42,
    color: "Preto",
    price: 599.99,
    image: "https://example.com/nike.jpg",
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  // Mock da função global alert
  beforeAll(() => {
    globalThis.alert = jest.fn(); // Mocka o alerta global
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa mocks após cada teste
  });

  it("deve renderizar os botões 'Editar' e 'Deletar'", () => {
    const { getByText } = renderWithTheme(
      <ViewSneaker sneaker={mockSneaker} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    expect(getByText('Editar')).toBeTruthy();
    expect(getByText('Deletar')).toBeTruthy();
  });

  it("deve chamar onEdit ao pressionar o botão 'Editar'", () => {
    const { getByText } = renderWithTheme(
      <ViewSneaker sneaker={mockSneaker} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    const editButton = getByText('Editar');
    fireEvent.press(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(mockSneaker.id);
  });

  it("deve exibir um alerta ao pressionar o botão 'Deletar'", async () => {
    const { getByText } = renderWithTheme(
      <ViewSneaker sneaker={mockSneaker} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );
  
    const deleteButton = getByText('Deletar');
    fireEvent.press(deleteButton);
  
    // Aguardar a execução do alert
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Deletar Sneaker",
        "Você tem certeza?",
        expect.any(Array)
      );
    });
  });
  
});

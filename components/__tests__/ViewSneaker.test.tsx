import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ViewSneaker from "../ViewSneaker";
import Sneaker from "../../types/Sneaker";
import { ThemeProvider } from "@/context/ThemeContext";
import { Alert } from "react-native";

jest.mock("../CardSneaker", () => {
  return () => <></>;
});

jest.mock('react-native/Libraries/Animated/Animated', () => {
    const RealAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
    return {
      ...RealAnimated,
      View: 'View',
    };
});

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => {
    return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

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

  beforeAll(() => {
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons && buttons.length > 0 && buttons[0].onPress) {
        buttons[0].onPress();
      }
    });

    jest.spyOn(global.console, 'log'); 
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it("deve chamar onDelete ao pressionar o botão 'Sim' no alerta", async () => {
    const { getByText } = renderWithTheme(
      <ViewSneaker sneaker={mockSneaker} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    const deleteButton = getByText('Deletar');

    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(global.console.log).toHaveBeenCalledWith("Deletar pressionado");
      expect(global.console.log).toHaveBeenCalledWith("ID encontrado, disparando alerta");
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });
});

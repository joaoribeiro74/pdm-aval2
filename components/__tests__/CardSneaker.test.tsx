import React from 'react';
import { render } from '@testing-library/react-native';
import CardSneaker from '../CardSneaker';
import { ThemeProvider } from '@/context/ThemeContext';
import Sneaker from '@/types/Sneaker';
import { Image } from 'react-native';

// Cria uma função auxiliar para renderizar com o ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const sneakerMock: Sneaker = {
  id: '123',
  name: 'Air Max',
  brand: 'Nike',
  color: 'Vermelho',
  size: 42,
  price: 299.99,
  image: 'https://exemplo.com/sneaker.png',
};

const sneakerMockWithoutImage: Sneaker = {
    id: '124',
    name: 'Air Max',
    brand: 'Nike',
    color: 'Azul',
    size: 43,
    price: 350.00,
    image: '', // Nenhuma URL de imagem fornecida
  };

  describe('CardSneaker Component', () => {
    it('deve renderizar os elementos principais sem detalhes', () => {
      const { getByText, queryByText } = renderWithTheme(
        <CardSneaker sneaker={sneakerMock}>{null}</CardSneaker>
      );
  
      // Verifica se o nome e a id aparecem
      expect(getByText(`${sneakerMock.brand} ${sneakerMock.name}`)).toBeTruthy();
      expect(getByText(/ID:/)).toBeTruthy();
  
      // showDetails é false por padrão, os detalhes não devem aparecer
      expect(queryByText(/Cor\(es\):/)).toBeNull();
      expect(queryByText(/Tamanho:/)).toBeNull();
    });
  
    it('deve renderizar os detalhes quando showDetails é true', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <CardSneaker sneaker={sneakerMock} showDetails>{null}</CardSneaker>
      );
  
      // Verifica os detalhes: cores, tamanho e preço
      expect(getByText(/Cor\(es\):/)).toBeTruthy();
      expect(getByText(sneakerMock.color)).toBeTruthy();
      expect(getByText(/Tamanho:/)).toBeTruthy();
      expect(getByText(String(sneakerMock.size))).toBeTruthy();
      expect(getByText(/R\$ ?\d+,\d{2}/)).toBeTruthy();
  
      // Verifica se a imagem da URL foi carregada corretamente
      const image = getByTestId('sneaker-image');
      expect(image.props.source.uri).toBe(sneakerMock.image);
    });
  
    it('deve exibir a imagem padrão quando não houver URL de imagem', () => {
      const { getByTestId } = renderWithTheme(
        <CardSneaker sneaker={sneakerMockWithoutImage} showDetails>{null}</CardSneaker>
      );
  
      // Verifica se a imagem padrão foi renderizada
      const image = getByTestId('sneaker-image');
        expect(image.props.source).toBe(require('@/assets/images/Sneaker.png'));
    });
  });
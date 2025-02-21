import React from 'react';
import { render } from '@testing-library/react-native';
import CardSneaker from '../CardSneaker';
import { ThemeProvider } from '@/context/ThemeContext';
import Sneaker from '@/types/Sneaker';
import { Image } from 'react-native';

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
    image: '',
  };

  describe('CardSneaker Component', () => {
    it('deve renderizar os elementos principais sem detalhes', () => {
      const { getByText, queryByText } = renderWithTheme(
        <CardSneaker sneaker={sneakerMock}>{null}</CardSneaker>
      );
  
      expect(getByText(`${sneakerMock.brand} ${sneakerMock.name}`)).toBeTruthy();
      expect(getByText(/ID:/)).toBeTruthy();
  
      expect(queryByText(/Cor\(es\):/)).toBeNull();
      expect(queryByText(/Tamanho:/)).toBeNull();
    });
  
    it('deve renderizar os detalhes quando showDetails é true', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <CardSneaker sneaker={sneakerMock} showDetails>{null}</CardSneaker>
      );

      expect(getByText(/Cor\(es\):/)).toBeTruthy();
      expect(getByText(sneakerMock.color)).toBeTruthy();
      expect(getByText(/Tamanho:/)).toBeTruthy();
      expect(getByText(String(sneakerMock.size))).toBeTruthy();
      expect(getByText(/R\$ ?\d+,\d{2}/)).toBeTruthy();

      const image = getByTestId('sneaker-image');
      expect(image.props.source.uri).toBe(sneakerMock.image);
    });
  
    it('deve exibir a imagem padrão quando não houver URL de imagem', () => {
      const { getByTestId } = renderWithTheme(
        <CardSneaker sneaker={sneakerMockWithoutImage} showDetails>{null}</CardSneaker>
      );

      const image = getByTestId('sneaker-image');
        expect(image.props.source).toBe(require('@/assets/images/Sneaker.png'));
    });
  });
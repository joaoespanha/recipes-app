import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando o componente Footer', () => {
  test('Testa os itens do menu do Footer', () => {
    renderWithRouter(<App />, '/foods');
    const imgDrinkIcon = screen.getByAltText('drink logo')
    const imgMealIcon = screen.getByAltText('meal logo')
});
test('Testa se o usuário vai para a página drinks ao clicar no icone', () => {
  const { history } = renderWithRouter(<App />, '/foods');
  const imgDrinkIcon = screen.getByAltText('drink logo')

  userEvent.click(imgDrinkIcon);

  const { location: { pathname } } = history;
  expect(pathname).toBe('/drinks');
});
test('Testa se o usuário vai para a página foods ao clicar no icone', () => {
  const { history } = renderWithRouter(<App />, '/drinks');
  const imgMealIcon = screen.getByAltText('meal logo')

  userEvent.click(imgMealIcon);

  const { location: { pathname } } = history;
  expect(pathname).toBe('/foods');
});
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const meals = require('../../cypress/mocks/meals');
const drinks = require('../../cypress/mocks/drinks');

describe('Testando o componente Footer', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Testa os itens do Footer', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(<App />, '/foods');

    await screen.findByRole('heading', { name: /corba/i });

    screen.getByAltText('drink logo');
    screen.getByAltText('meal logo');
  });

  test('Testa se o usuário vai para a página drinks ao clicar no ícone', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { history } = renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const imgDrinkIcon = screen.getByAltText('drink logo');
    userEvent.click(imgDrinkIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    await screen.findByRole('heading', { name: /gg/i });
  });

  test('Testa se o usuário vai para a página foods ao clicar no ícone', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(<App />, '/drinks');

    await screen.findByRole('heading', { name: /gg/i });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const imgMealIcon = screen.getByAltText('meal logo');
    userEvent.click(imgMealIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');

    await screen.findByRole('heading', { name: /corba/i });
  });
});

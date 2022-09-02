import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as mocks from './helpers/mocks';

describe('Testando o componente Recipe Details', () => {
  beforeEach(() => {
    /* Resolução de mock para matchMedia desenvolvida por: @jarretmoses (2020).
    Fonte: https://github.com/facebook/create-react-app/issues/10126
    Obs: mock necessário para resolução de Erro com componente Splide (biblioteca de carrousel instalada no projeto) */
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  // afterEach(() => jest.resetAllMocks());

  test('Testa se ao clicar no btn Start Recipe há o redirecionamento para receita de foods em progresso', async () => {
    const { history } = renderWithRouter(<App />, `/foods/${mocks.burekFoodData.meals.idMeal}`);

    const  btnStartRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(btnStartRecipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/foods/${mocks.burekFoodData.meals.idMeal}/in-progress`);
  });

  test('Testa se ao clicar no btn Start Recipe há o redirecionamento para receita de drinks em progresso', async () => {
    const { history } = renderWithRouter(<App />, `/drinks/${mocks.adamDrinkData.drinks.idDrink}`);

    const  btnStartRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(btnStartRecipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/drinks/${mocks.adamDrinkData.drinks.idDrink}/in-progress`);
  });

  test('Testa os elementos que devem aparecer na tela de comida em progresso', async () => {
    renderWithRouter(<App />, `/foods/${mocks.burekFoodData.meals.idMeal}/in-progress`);

    const favoriteBtn = screen.getByRole('button', { name: /favorite btn/i });
    const shareIcon = screen.getByTestId('share-btn');
    const image = screen.getByTestId('recipe-photo');
    const finishRecipe = screen.getByTestId('finish-recipe-btn');

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareIcon).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(finishRecipe).toBeInTheDocument();
  });

  test('Testa os elementos que devem aparecer na tela de bebida em progresso', async () => {
    renderWithRouter(<App />, `/drinks/${mocks.adamDrinkData.drinks.idDrink}/in-progress`);

    const favoriteBtn = screen.getByRole('button', { name: /favorite btn/i });
    const shareIcon = screen.getByTestId('share-btn');
    const image = screen.getByTestId('recipe-photo');
    const finishRecipe = screen.getByTestId('finish-recipe-btn');

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareIcon).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(finishRecipe).toBeInTheDocument();
  });
});
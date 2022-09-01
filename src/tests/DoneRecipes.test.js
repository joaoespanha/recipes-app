import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as mocks from './helpers/mocks';
import SetToLocalStorage from '../helpers/SetToLocalStorage';

describe('Testando a página DoneRecipes', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    SetToLocalStorage('doneRecipes', mocks.doneRecipesLS);
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test('Testa se os ícones existem na pagina e seus atributos', () => {
    renderWithRouter(<App />, '/done-recipes');

    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitle).toHaveAttribute('data-testid', 'page-title');

    const foodBtn = screen.getByRole('button', { name: /food/i });
    expect(foodBtn).toHaveAttribute('data-testid', 'filter-by-food-btn');

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    expect(drinksBtn).toHaveAttribute('data-testid', 'filter-by-drink-btn');

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toHaveAttribute('data-testid', 'filter-by-all-btn');
  });

  test('Testa se os elementos corretos dos cards de receitas prontas são renderizados', () => {
    renderWithRouter(<App />, '/done-recipes');

    const cardTitle = screen.getByText('Timbits');
    expect(cardTitle).toHaveAttribute('data-testid', '0-horizontal-name');

    const cardImg = screen.getByRole('img', { name: /timbits/i });
    expect(cardImg).toHaveAccessibleName('Timbits');
    expect(cardImg).toHaveAttribute('data-testid', '0-horizontal-image');

    const cardDescription = screen.getByText('Canadian - Dessert');
    expect(cardDescription).toHaveAttribute('data-testid', '0-horizontal-top-text');

    const cardDate = screen.getByText('Done in: 31/8/2022');
    expect(cardDate).toHaveAttribute('data-testid', '0-horizontal-done-date');

    const cardFoodTags = screen.getAllByRole('listitem');
    expect(cardFoodTags).toHaveLength(2);

    const shareBtns = screen.getAllByRole('img', { name: /share icon/i });
    expect(shareBtns).toHaveLength(2);
  });

  test('Testa filtro de receitas prontas por comidas', () => {
    renderWithRouter(<App />, '/done-recipes');

    const foodItem = screen.getByText('Timbits');
    const drinkItem = screen.queryByText('Banana Milk Shake');
    const foodBtn = screen.getByRole('button', { name: /food/i });

    userEvent.click(foodBtn);
    expect(foodItem).toBeInTheDocument();
    expect(drinkItem).not.toBeInTheDocument();
  });

  test('Testa filtro de receitas prontas por bebidas', () => {
    renderWithRouter(<App />, '/done-recipes');

    const foodItem = screen.queryByText('Timbits');
    const drinkItem = screen.getByText('Banana Milk Shake');
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(drinksBtn);
    expect(foodItem).not.toBeInTheDocument();
    expect(drinkItem).toBeInTheDocument();
  });

  test('Testa a remoção do filtro de receitas prontas no botão All', () => {
    renderWithRouter(<App />, '/done-recipes');

    let foodItem = screen.queryByText('Timbits');
    const drinkItem = screen.getByText('Banana Milk Shake');
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const allBtn = screen.getByRole('button', { name: /all/i });

    userEvent.click(drinksBtn);
    expect(foodItem).not.toBeInTheDocument();
    expect(drinkItem).toBeInTheDocument();

    userEvent.click(allBtn);
    foodItem = screen.queryByText('Timbits');
    expect(foodItem).toBeInTheDocument();
    expect(drinkItem).toBeInTheDocument();
  });

  test('Testa botão de compartilhar link da receita', () => {
    const mockWriteText = jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouter(<App />, '/done-recipes');

    let linkCopiedMessage = screen.queryByText('Link copied!');
    expect(linkCopiedMessage).not.toBeInTheDocument();

    const shareBtns = screen.getAllByRole('img', { name: /share icon/i });
    userEvent.click(shareBtns[0]);

    linkCopiedMessage = screen.queryByText('Link copied!');
    expect(linkCopiedMessage).toBeInTheDocument();
    expect(mockWriteText).toBeCalledTimes(1);
    expect(mockWriteText).toBeCalledWith('/foods/52929');
  });

  test('Testa se é redirecionado para a página da receita ao clicar no card', async () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.timbitsFoodData),
    });

    const { history } = renderWithRouter(<App />, '/done-recipes');

    const cardImg = screen.getByRole('img', { name: /timbits/i });
    userEvent.click(cardImg);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/foods/${mocks.timbitsFoodData.meals[0].idMeal}`);
  });
});

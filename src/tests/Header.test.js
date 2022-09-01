import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as mocks from './helpers/mocks';

const meals = require('../../cypress/mocks/meals');
const drinks = require('../../cypress/mocks/drinks');
const emptyDrinks = require('../../cypress/mocks/emptyDrinks');

describe('Testando o componente Header', () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa se os ícones existem na pagina e seus atributos', async () => {
    renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(pageTitle).toHaveTextContent('Foods');
    expect(profileIcon).toHaveAttribute('src', mocks.profileIconPath);
    expect(searchIcon).toHaveAttribute('src', mocks.searchIconPath);
  });

  test('Testa se há redirecionamento após o clique no ícone do profile', async () => {
    const { history } = renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  test('Testa se a barra de busca é renderizada após o clique', async () => {
    renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    screen.getByTestId('search-input');
  });

  test('Testa se não há botão da searchBar', () => {
    renderWithRouter(<App />, '/profile');

    const searchIcon = screen.queryByTestId('search-top-btn');
    expect(searchIcon).not.toBeInTheDocument();
  });
});

describe('Testa o componente Search Bar no Header da pagina de comidas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa se os botões para a busca estão na tela', async () => {
    renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    screen.getByTestId('name-search-radio');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('first-letter-search-radio');
    screen.getByRole('button', { name: 'Search' });
  });

  test('Testa se a busca é feita por nome', async () => {
    renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.searchedFoodData),
    });

    const radioByName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByName);
    userEvent.type(searchBar, 'chicken');
    userEvent.click(searchBtn);

    await screen.findByRole('heading', { name: mocks.searchedFoodData.meals[0].strMeal });

    const foodCards = screen.getAllByTestId(/\S+-card-img/i);
    expect(foodCards).toHaveLength(mocks.searchedFoodData.meals.length);
    expect(foodCards[0]).toHaveAccessibleName('Spicy Arrabiata Penne');
    expect(foodCards[1]).toHaveAccessibleName('Spicy North African Potato Salad');
  });

  test('Testa se quando a busca tem apenas um resultado, o usuário é redirecionado para a página certa', async () => {
    const { history } = renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.singleCaseFoodData),
    });

    const radioByName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByName);
    userEvent.type(searchBar, 'arrabiata');
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/foods/${mocks.singleCaseFoodData.meals[0].idMeal}`);
  });

  test('Testa se um alerta é lançado quando o usuário tentar buscar com mais de uma letra', async () => {
    global.alert = jest.fn().mockResolvedValue(mocks.moreThanOneTypeCase);
    renderWithRouter(<App />, '/foods');
    await screen.findByRole('heading', { name: /corba/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const radioByFirstLetter = screen.getByTestId('first-letter-search-radio');

    userEvent.click(radioByFirstLetter);
    userEvent.type(searchBar, 'aaa');
    userEvent.click(searchBtn);

    expect(global.alert).toHaveBeenCalled();
  });
});

describe('Testa o componente Search Bar no Header da pagina de bebidas', () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa se a busca é feita por nome', async () => {
    const { history } = renderWithRouter(<App />, '/drinks');
    await screen.findByRole('heading', { name: /gg/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.singleCaseDrinksData),
    });

    const radioByName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByName);
    userEvent.type(searchBar, 'sex on the beach');
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/drinks/${mocks.singleCaseDrinksData.drinks[0].idDrink}`);
  });

  test('Testa se a busca é feita por ingrediente', async () => {
    renderWithRouter(<App />, '/drinks');
    await screen.findByRole('heading', { name: /gg/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.drinkByIngredient),
    });

    const radioByIngredient = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByIngredient);
    userEvent.type(searchBar, 'mint');
    userEvent.click(searchBtn);

    await screen.findByRole(
      'heading', { name: mocks.drinkByIngredient.drinks[0].strDrink },
    );

    const drinkCards = screen.getAllByTestId(/\S+-card-img/i);
    expect(drinkCards).toHaveLength(mocks.drinkByIngredient.drinks.length);
    mocks.drinkByIngredient.drinks.forEach((drink, index) => {
      expect(drinkCards[index]).toHaveAccessibleName(drink.strDrink);
    });
  });

  test('Testa se um alerta é lançado quando o usuário tentar buscar com mais de uma letra', async () => {
    global.alert = jest.fn().mockResolvedValue(mocks.errorMessage);
    renderWithRouter(<App />, '/drinks');
    await screen.findByRole('heading', { name: /gg/i });

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyDrinks),
    });

    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const radioByName = screen.getByTestId('name-search-radio');

    userEvent.click(radioByName);
    userEvent.type(searchBar, 'aaa');
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(global.alert).toHaveBeenCalled();
  });
});

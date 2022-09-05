import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const mealCategories = require('../../cypress/mocks/mealCategories');
const chickenMeals = require('../../cypress/mocks/chickenMeals');
const meals = require('../../cypress/mocks/meals');

describe('Testa se os botões de filtro aparecem na tela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa se os botões para a busca estão na tela', async () => {
    renderWithRouter(<App />, '/foods');

    await screen.findByRole('button', { name: mealCategories.meals[0].strCategory });
    await screen.findByRole('button', { name: mealCategories.meals[1].strCategory });
    await screen.findByRole('button', { name: mealCategories.meals[2].strCategory });
    await screen.findByRole('button', { name: mealCategories.meals[3].strCategory });
    await screen.findByRole('button', { name: mealCategories.meals[4].strCategory });
  });

  test('Testa se é possível fazer filtro de comidas da categoria Chicken', async () => {
    renderWithRouter(<App />, '/foods');

    const chickenBtn = await screen.findByRole('button', { name: /chicken/i });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals),
    });

    userEvent.click(chickenBtn);
    await screen.findByRole('img', { name: chickenMeals.meals[0].strMeal });
  });

  test('Testa se é possível desfazer filtro de comidas com o toogle do botão', async () => {
    renderWithRouter(<App />, '/foods');

    const chickenBtn = await screen.findByRole('button', { name: /chicken/i });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals),
    });

    userEvent.click(chickenBtn);
    await screen.findByRole('img', { name: chickenMeals.meals[0].strMeal });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    userEvent.click(chickenBtn);
    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('heading', { name: /timbits/i });
  });

  test('Testa se é possível desfazer filtro de comidas com o botão All', async () => {
    renderWithRouter(<App />, '/foods');

    const chickenBtn = await screen.findByRole('button', { name: /chicken/i });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals),
    });

    userEvent.click(chickenBtn);
    await screen.findByRole('img', { name: chickenMeals.meals[0].strMeal });

    global.fetch.mockReset();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('heading', { name: /timbits/i });
  });
});

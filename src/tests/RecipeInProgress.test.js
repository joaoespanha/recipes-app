import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const meals = require('../../cypress/mocks/meals');

describe('Testando o componente RecipeInProgress', () => {

  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  jest.spyOn(navigator.clipboard, 'writeText');

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa os itens de uma página de receita em progresso', async () => {
    renderWithRouter(<App />, '/foods/53026/in-progress');

    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('img', { name: /corba/i });
    await screen.findByRole('button', { name: /finish recipe/i });
    await screen.findByRole('heading', { name: /instructions/i });

    const shareButton =  await screen.findByTestId('share-btn');
    
    const favoriteButton = await screen.findByTestId('favorite-btn')
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(shareButton);
    const shareMessage = await screen.findByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });
})
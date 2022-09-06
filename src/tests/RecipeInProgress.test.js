import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import * as mocks from './helpers/mocks';

describe('Testando o componente RecipeInProgress', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.corbaFoodData),
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('Testa os itens de uma página de receita em progresso', async () => {
    renderWithRouter(<App />, '/foods/52977/in-progress');

    await screen.findByRole('heading', { name: /corba/i });
    await screen.findByRole('img', { name: /corba/i });
    screen.getByRole('button', { name: /finish recipe/i });
    screen.getByRole('heading', { name: /instructions/i });

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeartIcon);

    const shareButton = screen.getByTestId('share-btn');
    userEvent.click(shareButton);
    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });
});

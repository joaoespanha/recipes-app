import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as mocks from './helpers/mocks';

describe('Testando o componente Header', () => {
  test('Testa se os icones existem na pagina e seus atributos', () => {
    renderWithRouter(<App />, '/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(pageTitle).toHaveTextContent('Foods');
    expect(profileIcon).toHaveAttribute('src', mocks.profileIconPath);
    expect(searchIcon).toHaveAttribute('src', mocks.searchIconPath);
  });

  test('Testa se há redirecionamento após o clique', () => {
    const { history } = renderWithRouter(<App />, '/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  test('Testa se a barra de busca é renderizada após o clique', () => {
    renderWithRouter(<App />, '/foods');

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  test('Testa se não há botão da searchBar', () => {
    renderWithRouter(<App />, '/profile');

    const searchIcon = screen.queryByTestId('search-top-btn');
    expect(searchIcon).not.toBeInTheDocument();
  });
});

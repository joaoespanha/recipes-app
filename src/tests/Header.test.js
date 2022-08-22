import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import HomeFoods from '../pages/HomeFoods';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import * as mocks from '../tests/helpers/mocks'

describe('Testando o componente Header', () => {
  test('Testa se os icones existem na pagina e seus atributos', () => {
    renderWithRouter(<HomeFoods />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    
    expect(pageTitle).toHaveTextContent('Foods');
    expect(profileIcon).toHaveAttribute('src', mocks.profileIconPath )
    expect(searchIcon).toHaveAttribute('src', mocks.searchIconPath )
  });
  test('Testa se há redirecionamento após o clique', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = screen.getByTestId('profile-top-btn');

    userEvent.click(profileIcon);
    
    const { location: { pathname }} = history;
    expect(pathname).toBe('/profile');
  });
  test('Testa se a barra de busca é renderizada após o clique', () => {
    renderWithRouter(<HomeFoods />);
    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input')
    expect(searchBar).toBeInTheDocument();
  });
  test('Testa se não há botão da searchBar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const searchIcon = screen.queryByTestId('search-top-btn');
 
    expect(searchIcon).not.toBeInTheDocument();
  });
});
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as mocks from './helpers/mocks';
import { wait } from '@testing-library/user-event/dist/utils';

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

describe('Testa o componente Search Bar na pagina de comidas', () => {
  
  
  afterEach(() => jest.clearAllMocks())

  test('testa se os botoes estao na tela', () => {
    // renderWithRouter(<App />, '/foods')
    global.fetch =  jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.apiMockData)
    })

    renderWithRouter(<App />, '/foods');
    const searchIcon = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchIcon);
    
    const radioByName = screen.getByTestId('name-search-radio')
    const radioByIngridient = screen.getByTestId('ingredient-search-radio')
    const radioByFirstLetter = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByRole('button', {name:'Search'})


  })
  test('testa se  a busca e feita por nome', async () => {
    renderWithRouter(<App />, '/foods');

    global.fetch =  jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.apiMockData)
    })
    const searchIcon = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchIcon);
    
    const radioByName = screen.getByTestId('name-search-radio')
    const radioByIngridient = screen.getByTestId('ingredient-search-radio')
    const radioByFirstLetter = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByRole('button', {name:'Search'})
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByName)
    userEvent.type(searchBar, 'chicken')
    userEvent.click(searchBtn)

     await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
     }) 
     const foodCards =   screen.getAllByTestId(/\S+-card-img/i)
     console.log(foodCards);
     expect(foodCards).toHaveLength(mocks.apiMockData.meals.length)
     expect(foodCards[0]).toHaveAccessibleName('Spicy Arrabiata Penne')
     expect(foodCards[1]).toHaveAccessibleName('Spicy North African Potato Salad')
     
  })
  test('testa se quando a busca tem apenas um resultado o usuario e redirecionado para a pagina certa', async () => {

    global.fetch =  jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks.singleCaseData)
    })
    const {history} =  renderWithRouter(<App />, '/foods');    
    
    const searchIcon = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchIcon);
    
    const radioByName = screen.getByTestId('name-search-radio')
    const radioByIngridient = screen.getByTestId('ingredient-search-radio')
    const radioByFirstLetter = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByRole('button', {name:'Search'})
    const searchBar = screen.getByTestId('search-input');

    userEvent.click(radioByName)
    userEvent.type(searchBar, 'arrabiata')
    userEvent.click(searchBtn)

     await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
     }) 
     const {location:{pathname}} = history

     expect(pathname).toBe(`/foods/${mocks.singleCaseData.meals[0].idMeal}`)

     
  
})
  test('testa se um alerta e lancado quando o usuario tentar buscar com mais de uma letra', () => {
    global.alert =  jest.fn().mockResolvedValue(mocks.moreThanOneTypeCase)

    const {history} =  renderWithRouter(<App />, '/foods'); 
    const searchIcon = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchIcon)
    
    const searchBar = screen.getByTestId('search-input');
    const searchBtn = screen.getByRole('button', {name:'Search'})
    const radioByFirstLetter = screen.getByTestId('first-letter-search-radio')
    
    userEvent.click(radioByFirstLetter)
    userEvent.type(searchBar, 'aaa')
    userEvent.click(searchBtn)

    expect(global.alert).toHaveBeenCalled()



  })

})

  describe('testa nos casos de busca de drinks', () => {
    test('testa se a busca e feita por nome', async () => {
      global.fetch =  jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mocks.singleCaseDrinksData)
      })

      const {history} =  renderWithRouter(<App />, '/drinks'); 

      const searchIcon = screen.getByTestId('search-top-btn');
      
      userEvent.click(searchIcon);
      
      const radioByName = screen.getByTestId('name-search-radio')
      const searchBtn = screen.getByRole('button', {name:'Search'})
      const searchBar = screen.getByTestId('search-input');
  
      userEvent.click(radioByName)
      userEvent.type(searchBar, 'sex on the beach')
      userEvent.click(searchBtn)
  
       await waitFor(() => {
        expect(fetch).toHaveBeenCalled()
       }) 

       const {location:{pathname}} = history

       console.log(pathname);

       expect(pathname).toBe(`/drinks/${mocks.singleCaseDrinksData.drinks[0].idDrink}`)
  

    })


  })

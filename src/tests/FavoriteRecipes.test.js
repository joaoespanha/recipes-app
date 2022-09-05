import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import renderWithRouter from './helpers/renderWithRouter';


describe('Testando a página FavoriteRecipes', () => {

  const favoriteRecipesLS = [
    {
        "id": "52977",
        "type": "food",
        "nationality": "Turkish",
        "category": "Side",
        "alcoholicOrNot": "",
        "name": "Corba",
        "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
    },
    {
        "id": "15997",
        "type": "drink",
        "nationality": "",
        "category": "Ordinary Drink",
        "alcoholicOrNot": "Optional alcohol",
        "name": "GG",
        "image": "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"
    }
];


  it('Testa os itens do Footer', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesLS));
    renderWithRouter(<App />, '/favorite-recipes');
    
    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    expect(foodFilterBtn).toBeInTheDocument();
    expect(drinkFilterBtn).toBeInTheDocument();
    expect(allFilterBtn).toBeInTheDocument();

    const favItem1 = await screen.findByTestId('0-horizontal-image');
    const favItem2 = await screen.findByTestId('1-horizontal-image');
    expect(favItem1).toBeInTheDocument();
    expect(favItem2).toBeInTheDocument();    

  });

});

import React, { useContext, useEffect } from 'react';
import ReceipeContext from '../context/ReceipeContext';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import BtnFilters from '../components/BtnFilters';

export default function FavoriteRecipes() {
  const { favoriteRecipeList, setfavoriteRecipeList } = useContext(ReceipeContext);

  const getFromLocalStorage = () => {
    const recipesList = GetToLocalStorage('favoriteRecipes');
    setfavoriteRecipeList(recipesList);
  };

  useEffect(() => {
    getFromLocalStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <BtnFilters pathname="favoriteRecipes" />
      { favoriteRecipeList?.map((recipe, index) => (
        <RecipeCard recipeData={ recipe } index={ index } key={ recipe.id } />
      )) }
    </div>
  );
}

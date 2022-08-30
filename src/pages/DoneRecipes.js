import React, { useContext, useEffect } from 'react';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import ReceipeContext from '../context/ReceipeContext';
import BtnFilters from '../components/BtnFilters';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function DoneRecipes() {
  const { doneRecipesList, setDoneRecipesList } = useContext(ReceipeContext);

  const getFromLocalStorage = () => {
    const recipesList = GetToLocalStorage('doneRecipes');
    setDoneRecipesList(recipesList);
  };

  useEffect(() => {
    getFromLocalStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <BtnFilters pathname="doneRecipes" />
      { doneRecipesList?.map((recipe, index) => (
        <RecipeCard recipeData={ recipe } index={ index } key={ recipe.id } />
      )) }
    </div>
  );
}

import React, { useContext, useEffect } from 'react';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import ReceipeContext from '../context/ReceipeContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function DoneRecipes() {
  const { doneRecipesList, setDoneRecipesList } = useContext(ReceipeContext);

  const getFromLocalStorage = () => {
    const recipesList = GetToLocalStorage('doneRecipes');
    setDoneRecipesList(recipesList);
  };

  const filterList = (category) => {
    // getFromLocalStorage() --> não conseguimos aplicar a função por ser assíncrona;
    const filteredRecipes = doneRecipesList.filter((item) => item.type === category);
    setDoneRecipesList(filteredRecipes);
  };

  useEffect(() => {
    getFromLocalStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterList('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterList('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getFromLocalStorage }
      >
        All
      </button>
      { doneRecipesList?.map((recipe, index) => (
        <RecipeCard recipeData={ recipe } index={ index } key={ recipe.id } />
      )) }
    </div>
  );
}

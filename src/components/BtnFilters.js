import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from '../context/ReceipeContext';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import '../style/doneRecipes.css';

export default function BtnFilters({ pathname }) {
  const { doneRecipesList, setDoneRecipesList,
    favoriteRecipeList, setfavoriteRecipeList } = useContext(ReceipeContext);

  const filterList = (category) => {
    // getFromLocalStorage() --> não conseguimos aplicar a função por ser assíncrona;
    if (pathname === 'doneRecipes') {
      const filteredRecipes = doneRecipesList.filter((item) => item.type === category);
      setDoneRecipesList(filteredRecipes);
    } else if (pathname === 'favoriteRecipes') {
      const filteredRecipes = favoriteRecipeList.filter((item) => item.type === category);
      setfavoriteRecipeList(filteredRecipes);
    }
  };

  const getFromLocalStorage = () => {
    if (pathname === 'doneRecipes') {
      const recipesList = GetToLocalStorage('doneRecipes');
      setDoneRecipesList(recipesList);
    } else if (pathname === 'favoriteRecipes') {
      const recipesList = GetToLocalStorage('favoriteRecipes');
      setfavoriteRecipeList(recipesList);
    }
  };

  return (
    <div className="btnsFilter">
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
    </div>
  );
}
BtnFilters.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

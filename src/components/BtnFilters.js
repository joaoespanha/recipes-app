import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from '../context/ReceipeContext';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import '../style/doneRecipes.css';

export default function BtnFilters({ pathname }) {
  const { setDoneRecipesList, setfavoriteRecipeList } = useContext(ReceipeContext);

  const filterList = (category) => {
    const recipesList = GetToLocalStorage(pathname);
    const filteredRecipes = recipesList.filter((item) => item.type === category);
    if (pathname === 'doneRecipes') {
      setDoneRecipesList(filteredRecipes);
    } else if (pathname === 'favoriteRecipes') {
      setfavoriteRecipeList(filteredRecipes);
    }
  };

  const getFromLocalStorage = () => {
    const recipesList = GetToLocalStorage(pathname);
    if (pathname === 'doneRecipes') {
      setDoneRecipesList(recipesList);
    } else if (pathname === 'favoriteRecipes') {
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

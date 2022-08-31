import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import { fetchFoods, fetchDrinks } from '../servicesAPI/requests';
import '../style/header.css';

function SearchBar() {
  const {
    currentSelected,
    setCurrentSelected,
    setApiResponse,
    inputSearch,
    setInputSearch,
    currentCategory,
  } = useContext(SearchContext);
  const history = useHistory();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    if (name === 'radio-search') setCurrentSelected(value);
    if (name === 'searchInput') setInputSearch(value);
  };

  const verifyInput = () => !(currentSelected !== '' && inputSearch.length > 0);

  const redirectToOneRecipePage = (recipesData) => {
    if (recipesData.length === 1 && currentCategory === 'foods') {
      history.push(`/foods/${recipesData[0].idMeal}`);
    } else if (recipesData.length === 1 && currentCategory === 'drinks') {
      history.push(`/drinks/${recipesData[0].idDrink}`);
    }
  };

  const handleSearch = async () => {
    if (inputSearch.length > 1 && currentSelected === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const recipesData = currentCategory === 'foods'
        ? await fetchFoods(currentSelected, inputSearch)
        : await fetchDrinks(currentSelected, inputSearch);
      if (recipesData) {
        setApiResponse(recipesData);
        redirectToOneRecipePage(recipesData);
      }
    }
  };

  return (
    <div className="searchBar">
      <form>
        <input
          data-testid="search-input"
          type="text"
          name="searchInput"
          value={ inputSearch }
          onChange={ handleInput }
          className="inputText"
        />
        <label htmlFor="ingredient" className="inputRadio">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="radio-search"
            value="ingredient"
            onChange={ handleInput }
          />
          Ingredient
        </label>
        <label htmlFor="name" className="inputRadio">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="radio-search"
            value="name"
            onChange={ handleInput }
          />
          Name
        </label>
        <label htmlFor="firstLetter" className="inputRadio">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetter"
            name="radio-search"
            value="firstLetter"
            onChange={ handleInput }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          disabled={ verifyInput() }
          onClick={ handleSearch }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';

function Card({ index, isMeal }) {
  const { apiResponse } = useContext(SearchContext);

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ isMeal
          ? (apiResponse[index].strMealThumb) : (apiResponse[index].strDrinkThumb) }
        alt={ isMeal ? (apiResponse[index].strMeal) : (apiResponse[index].strDrink) }
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        {isMeal ? (apiResponse[index].strMeal) : (apiResponse[index].strDrink) }

      </h3>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default Card;

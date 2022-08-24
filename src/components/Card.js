import PropTypes from 'prop-types';
import React from 'react';

function Card({ index, isMeal, recipeData }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ isMeal
          ? (recipeData.strMealThumb) : (recipeData.strDrinkThumb) }
        alt={ isMeal ? (recipeData.strMeal) : (recipeData.strDrink) }
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        {isMeal ? (recipeData.strMeal) : (recipeData.strDrink) }

      </h3>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  isMeal: PropTypes.bool,
  recipeData: PropTypes.object,
}.isRequired;

export default Card;

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ index, isMeal, recipeData }) {
  return (
    <Link
      data-testid={ `${index}-recomendation-card` }
      to={ isMeal ? `/foods/${recipeData.idMeal}` : `/drinks/${recipeData.idDrink}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        style={ { width: '50vw', height: '50vw' } }
      >
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
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  isMeal: PropTypes.bool,
  recipeData: PropTypes.object,
}.isRequired;

export default Card;

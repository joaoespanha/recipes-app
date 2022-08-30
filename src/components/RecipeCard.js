import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BtnsMenu from './BtnsMenu';

export default function RecipeCard({ recipeData, index }) {
  return (
    <div>
      <Link to={ `${recipeData.type}s/${recipeData.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ recipeData.name }
          src={ recipeData.image }
          width="100%"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ recipeData.name }</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { (recipeData.alcoholicOrNot === '')
          ? `${recipeData.nationality} - ${recipeData.category}`
          : recipeData.alcoholicOrNot }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipeData.doneDate }
      </p>
      {
        recipeData.tags && (
      <ul>
        { recipeData.tags?.map((tag, indexTag) => (indexTag < 2) && (
          <li
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ tag }
          >
            {tag}
          </li>
        )) }
      </ul>
        )
      }
      <BtnsMenu index={ index } type={ recipeData.type } idRecipe={ recipeData.id } />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.string,
  recipeData: PropTypes.shape({}),
}.isRequired;

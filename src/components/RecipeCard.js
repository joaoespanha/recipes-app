import PropTypes from 'prop-types';
import React from 'react';
import BtnsMenu from './BtnsMenu';

export default function RecipeCard({ recipeData, index }) {
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ recipeData.name }
        src={ recipeData.image }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipeData.nationality} - ${
          recipeData.category !== '' ? recipeData.category : recipeData.alcoholicOrNot}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ recipeData.name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipeData.doneDate }
      </p>
      <ul>
        {
          recipeData.tags.map((tag, index2) => (
            index2 < 2 && (
              <li
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </li>)))
        }
      </ul>
      <BtnsMenu index={ index } />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.string,
  recipeData: PropTypes.shape({}),
}.isRequired;

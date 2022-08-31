import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BtnsMenu from './BtnsMenu';
import '../style/doneRecipes.css';

export default function RecipeCard({ recipeData, index }) {
  return (
    <div className="recipeCard">
      <Link to={ `${recipeData.type}s/${recipeData.id}` } className="linkCard">
        <p data-testid={ `${index}-horizontal-name` }>{ recipeData.name }</p>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ recipeData.name }
          src={ recipeData.image }
          width="100%"
        />
      </Link>
      <div className="cardInfo">
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { (recipeData.alcoholicOrNot === '')
            ? `${recipeData.nationality} - ${recipeData.category}`
            : recipeData.alcoholicOrNot }
        </p>
        {
          recipeData.tags && (
            <>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { `Done in: ${recipeData.doneDate}` }
              </p>
              <ul>
                { recipeData.tags.map((tag, indexTag) => (indexTag < 2) && (
                  <li
                    data-testid={
                      `${index}-${tag}-horizontal-tag`
                    }
                    key={ tag }
                  >
                    {tag}
                  </li>
                )) }
              </ul>
            </>
          )
        }
        <div className="btnsMenuCard">
          <BtnsMenu index={ index } type={ recipeData.type } idRecipe={ recipeData.id } />
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.string,
  recipeData: PropTypes.shape({}),
}.isRequired;

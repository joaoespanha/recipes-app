import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';

export default function RecipeInstructions() {
  const { shownReceipe } = useContext(ReceipeContext);
  const location = useLocation();
  const { pathname } = location;

  const getIngredientsOrMeasures = (strTag) => {
    const initialArray = Object.entries(shownReceipe[0]);
    const filteredIngredients = initialArray
      .filter((array) => array[0].startsWith(strTag) && array[1])
      .map((ingredient) => ingredient[1]);
    // console.log(filteredIngredients);
    return filteredIngredients;
  };
  const concatIgredientsData = () => {
    const ingredients = getIngredientsOrMeasures('strIngredient');
    const measures = getIngredientsOrMeasures('strMeasure');
    const instructions = ingredients.map((ingredient, index) => ({
      ingredient,
      measure: measures[index],
    }));
    // console.log(instructions);
    return instructions;
  };

  const checkUrl = () => {
    const isInProgressUrl = pathname.includes('in-progress');
    console.log(isInProgressUrl);
    return isInProgressUrl;
  };
  return (
    <div>
      <img
        src={ shownReceipe[0]?.strMealThumb ?? shownReceipe[0].strDrinkThumb }
        alt={ shownReceipe[0]?.strMeal ?? shownReceipe[0].strDrink }
        data-testid="recipe-photo"
        width="100%"
      />
      <h3
        data-testid="recipe-title"
      >
        { shownReceipe[0]?.strMeal ?? shownReceipe[0].strDrink }
      </h3>
      <h4
        data-testid="recipe-category"
      >
        { shownReceipe[0]?.strAlcoholic ?? shownReceipe[0].strCategory }
      </h4>
      <ul>
        { concatIgredientsData().map((instruction, index) => (
          <li
            key={ index }
            data-testid={
              checkUrl()
                ? `${index}-ingredient-step` : `${index}-ingredient-name-and-measure`
            }
          >
            {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
          </li>
        )) }
      </ul>
      <p data-testid="instructions">{ shownReceipe[0].strInstructions }</p>

    </div>
  );
}

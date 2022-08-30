import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import SetToLocalStorage from '../helpers/SetToLocalStorage';

export default function RecipeInstructions() {
  const { shownReceipe } = useContext(ReceipeContext);
  const [instructionsDone, setInstructionsDone] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const { id } = useParams();

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    return returnedCategory[0];
  };

  const getRecipeStatus = () => {
    const currCategory = setCategory() === 'drinks' ? 'cocktails' : 'meals';
    const recipeStatus = GetToLocalStorage('inProgressRecipes')?.[currCategory][id];
    if (recipeStatus) setInstructionsDone(recipeStatus);
  };

  const checkUrl = () => pathname.includes('in-progress');

  const setInstructionsToStorage = () => {
    const currCategory = setCategory() === 'drinks' ? 'cocktails' : 'meals';
    const prevStorage = GetToLocalStorage('inProgressRecipes');
    if (prevStorage && checkUrl()) {
      prevStorage[currCategory][id] = instructionsDone;
      SetToLocalStorage('inProgressRecipes', prevStorage);
    } else if (!prevStorage && currCategory === 'cocktails' && checkUrl()) {
      const newStorage = {
        cocktails: { [id]: instructionsDone },
        meals: {},
      };
      SetToLocalStorage('inProgressRecipes', newStorage);
    } else if (!prevStorage && currCategory === 'meals' && checkUrl()) {
      const newStorage = {
        cocktails: {},
        meals: { [id]: instructionsDone },
      };
      SetToLocalStorage('inProgressRecipes', newStorage);
    }
  };

  const getIngredientsOrMeasures = (strTag) => {
    const initialArray = Object.entries(shownReceipe[0]);
    const filteredIngredients = initialArray
      .filter((array) => array[0].startsWith(strTag) && array[1])
      .map((ingredient) => ingredient[1]);
    return filteredIngredients;
  };

  const concatIgredientsData = () => {
    const ingredients = getIngredientsOrMeasures('strIngredient');
    const measures = getIngredientsOrMeasures('strMeasure');
    const instructions = ingredients.map((ingredient, index) => ({
      ingredient,
      measure: measures[index],
    }));
    return instructions;
  };

  const isChecked = (value) => instructionsDone?.some((instr) => instr === value);

  const toggleCheckbox = ({ target: { value } }) => {
    if (isChecked(value)) {
      const updatedList = instructionsDone.filter((instr) => instr !== value);
      setInstructionsDone(updatedList);
    } else {
      const updatedList = [...instructionsDone, value];
      setInstructionsDone(updatedList);
    }
  };

  const enableButton = () => {
    const ingredients = getIngredientsOrMeasures('strIngredient');
    return (instructionsDone?.length === ingredients.length);
  };

  const recipeObject = () => {
    const date = new Date();
    return {
      id,
      type: (setCategory() === 'foods') ? 'food' : 'drink',
      nationality: shownReceipe[0]?.strArea ?? '',
      category: shownReceipe[0]?.strCategory,
      alcoholicOrNot: shownReceipe[0]?.strAlcoholic ?? '',
      name: shownReceipe[0]?.strMeal ?? shownReceipe[0]?.strDrink,
      image: shownReceipe[0]?.strMealThumb ?? shownReceipe[0]?.strDrinkThumb,
      doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      tags: shownReceipe[0]?.strTags ? shownReceipe[0]?.strTags.split(',') : [],
    };
  };

  const setDoneRecipes = () => {
    const getDoneRecipes = GetToLocalStorage('doneRecipes');
    const isDoneRecipe = getDoneRecipes?.some((item) => item.id === id);
    const currentObject = recipeObject();
    if (getDoneRecipes?.length > 0 && !isDoneRecipe) {
      SetToLocalStorage('doneRecipes', [...getDoneRecipes, currentObject]);
    } else if (!isDoneRecipe) {
      SetToLocalStorage('doneRecipes', [currentObject]);
    }
  };

  const finishRecipe = () => {
    setDoneRecipes();
    history.push('/done-recipes');
  };

  useEffect(() => {
    getRecipeStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInstructionsToStorage();
    // eslint-disable-next-line
  }, [instructionsDone]);

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
      { checkUrl() ? (
        <form>
          { concatIgredientsData().map((instruction, index) => (
            <label
              htmlFor={ `listItem${index + 1}` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ `listItem${index + 1}` }
                name={ id }
                value={ `${instruction.ingredient} ${instruction?.measure ?? ''}` }
                onChange={ toggleCheckbox }
                checked={
                  isChecked(`${instruction.ingredient} ${instruction?.measure ?? ''}`)
                }
              />
              {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
            </label>
          )) }
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ finishRecipe }
            disabled={ !enableButton() }
          >
            Finish Recipe
          </button>
        </form>
      ) : (
        <ul>
          { concatIgredientsData().map((instruction, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
            </li>
          )) }
        </ul>)}
      <p data-testid="instructions">{ shownReceipe[0].strInstructions }</p>
    </div>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import SetToLocalStorage from '../helpers/SetToLocalStorage'; 
// falta implementar a funcao da linha 68 com a lógica do local storage para as receitas serem salvas e checked

export default function RecipeInstructions() {
  const { shownReceipe } = useContext(ReceipeContext);
  const location = useLocation();
  const { pathname } = location;
  const [instructionsDone, setInstructionsDone] = useState([]);

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    // console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };
  const id = shownReceipe[0]?.idMeal ?? shownReceipe[0].idDrink;
  const category = setCategory();

  const getRecipeStatus = () => {
    const currCategory = category === 'drinks' ? 'cocktails' : 'meals';
    const recipeStatus = GetToLocalStorage('inProgressRecipes')?.[currCategory];
    if (recipeStatus) setInstructionsDone(recipeStatus[id]);
  };

  const isChecked = (value) => instructionsDone.some((instr) => instr === value);

  useEffect(() => {
    getRecipeStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return isInProgressUrl;
  };

  const toggleCheckbox = ({ target: { value } }) => {
    if (isChecked(value)) {
      const updatedList = instructionsDone.filter((instr) => instr !== value);
      setInstructionsDone(updatedList);
    } else {
      const updatedList = [...instructionsDone, value];
      setInstructionsDone(updatedList);
    }
  };

  // const setInstructionsToStorage = () => {
  //   const currCategory = category === 'drinks' ? 'cocktails' : 'meals';
  //   const prevStorage = GetToLocalStorage('inProgressRecipes');
  //   prevStorage[currCategory][id] = instructionsDone;

  //   if (prevStorage) {
  //     SetToLocalStorage(prevStorage);
  //   }
  // }; 

  useEffect(() => {
    // setInstructionsToStorage();
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
                checked={ isChecked(
                  `${instruction.ingredient} ${instruction?.measure ?? ''}`,
                ) }
              />
              {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
            </label>
          )) }
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

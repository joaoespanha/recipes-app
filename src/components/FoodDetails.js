import React, { useContext } from 'react';
import ReceipeContext from '../context/ReceipeContext';

export default function FoodDetails() {
  const { shownReceipe } = useContext(ReceipeContext);

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
    console.log(instructions);
    return instructions;
  };

  concatIgredientsData();

  return (
    <div>
      {/* Foto: strDrinkThumb
          Nome: strDrink
          Categoria: strCategory
          Lista de ingredientes: strIngredient[index]
          Instruções: strInstructions
          Vídeo(comidas)
          Receitas recomendadas
      */}
      <img
        src={ shownReceipe[0].strMealThumb }
        alt={ shownReceipe[0].strMeal }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ shownReceipe[0].strMeal }</h3>
      <h4 data-testid="recipe-category">{ shownReceipe[0].strCategory }</h4>
      <ul>
        {
          concatIgredientsData().map((instruction, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ shownReceipe[0].strInstructions }</p>
      <iframe
        width="668"
        height="376"
        src={ shownReceipe[0].strYoutube }
        title={ shownReceipe[0].strMeal }
        frameBorder="0"
        allow={ 'accelerometer; autoplay; clipboard-write;'
          + 'encrypted-media; gyroscope; picture-in-picture' }
        allowFullScreen
      />
    </div>
  );
}

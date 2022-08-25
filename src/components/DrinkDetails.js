import React, { useContext, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import ReceipeContext from '../context/ReceipeContext';
import Card from './Card';
import { getStartRecipes } from '../servicesAPI/requests';

export default function DrinkDetails() {
  const { shownReceipe } = useContext(ReceipeContext);

  const [recomendations, setRecomendations] = useState([]);

  const getRecomendations = async () => {
    const recomendationsData = await getStartRecipes('foods');
    const results = recomendationsData.filter((recomen, index) => index < +'6');
    setRecomendations(results);
  };

  useEffect(() => {
    getRecomendations();
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

  return (
    <div>
      <img
        src={ shownReceipe[0]?.strDrinkThumb }
        alt={ shownReceipe[0]?.strDrink }
        data-testid="recipe-photo"
        width="100%"
      />
      <h3 data-testid="recipe-title">{ shownReceipe[0].strDrink }</h3>
      <h4 data-testid="recipe-category">{ shownReceipe[0].strAlcoholic }</h4>
      <p>{}</p>
      <ul>
        {
          concatIgredientsData().map((instruction, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${instruction.ingredient} ${instruction?.measure ?? ''}`}
            </li>))
        }
      </ul>
      <p data-testid="instructions">{ shownReceipe[0].strInstructions }</p>
      <Splide
        options={ {
          perPage: 1,
          arrows: true,
          pagination: true,
          autoplay: false,
        } }
      >
        {recomendations.map((item, index) => (
          <SplideSlide
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-title` }
          >
            <Card
              index={ index }
              isMeal
              recipeData={ item }
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

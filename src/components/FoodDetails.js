import React, { useContext, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import ReceipeContext from '../context/ReceipeContext';
import { getStartRecipes } from '../servicesAPI/requests';
import Card from './Card';

export default function FoodDetails() {
  const { shownReceipe } = useContext(ReceipeContext);

  const [recomendations, setRecomendations] = useState([]);

  const getRecomendations = async () => {
    const recomendationsData = await getStartRecipes('drinks');
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
    console.log(instructions);
    return instructions;
  };

  const embedURL = () => shownReceipe[0].strYoutube?.replace('watch?v=', 'embed/');
  return (
    <div>
      <img
        src={ shownReceipe[0].strMealThumb }
        alt={ shownReceipe[0].strMeal }
        data-testid="recipe-photo"
        width="100%"
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
        width="100%"
        height="376"
        src={ embedURL() }
        title={ shownReceipe[0].strMeal }
        frameBorder="0"
        data-testid="video"
        allow={ 'accelerometer; autoplay; clipboard-write;'
          + 'encrypted-media; gyroscope; picture-in-picture' }
        allowFullScreen
      />
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
            key={ item.idDrink }
            data-testid={ `${index}-recomendation-title` }
          >
            <Card
              index={ index }
              recipeData={ item }
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

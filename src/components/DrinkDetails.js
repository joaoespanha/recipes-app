import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from './Card';
import { getStartRecipes } from '../servicesAPI/requests';
import RecipeInstructions from './RecipeInstructions';

export default function DrinkDetails() {
  const [recomendations, setRecomendations] = useState([]);

  const getRecomendations = async () => {
    const recomendationsData = await getStartRecipes('foods');
    const results = recomendationsData.filter((_recomen, index) => index < +'6');
    setRecomendations(results);
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  return (
    <div>
      <RecipeInstructions />
      <Splide
        options={ {
          perPage: 2,
          arrows: true,
          pagination: true,
          autoplay: false,
          gap: '20px',
        } }
      >
        { recomendations.map((item, index) => (
          <SplideSlide
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            <Card
              index={ index }
              isMeal
              recipeData={ item }
            />
          </SplideSlide>
        )) }
      </Splide>
    </div>
  );
}

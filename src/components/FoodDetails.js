import React, { useContext, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import ReceipeContext from '../context/ReceipeContext';
import { getStartRecipes } from '../servicesAPI/requests';
import Card from './Card';
import RecipeInstructions from './RecipeInstructions';
import '../style/RecipeDetails.css';

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

  const embedURL = () => shownReceipe[0].strYoutube?.replace('watch?v=', 'embed/');

  return (
    <div className="foodDetails">
      <RecipeInstructions />
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
      <h3>Recommended</h3>
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
            key={ item.idDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <Card
              index={ index }
              recipeData={ item }
            />
          </SplideSlide>
        )) }
      </Splide>
    </div>
  );
}

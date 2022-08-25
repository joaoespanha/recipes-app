import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import '../style/RecipeDetails.css';
import { getReceipeDetails } from '../servicesAPI/requests';
import DrinkDetails from './DrinkDetails';
import FoodDetails from './FoodDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { setShownReceipe } = useContext(ReceipeContext);

  const setCategory = () => {
    const { pathname } = location;
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };

  const category = setCategory();

  const getDetails = async () => {
    const receipe = await getReceipeDetails(category, id);
    console.log('receipe', receipe);
    setShownReceipe(receipe);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {
        category === 'foods' ? <FoodDetails /> : <DrinkDetails />
      }
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipeBtn"
      >
        Start Recipe

      </button>
    </div>
  );
}

import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BtnsMenu from './BtnsMenu';
import RecipeInstructions from './RecipeInstructions';
import ReceipeContext from '../context/ReceipeContext';
import { getReceipeDetails } from '../servicesAPI/requests';

export default function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();

  const { pathname } = location;
  const { setShownReceipe } = useContext(ReceipeContext);

  const finishRecipe = () => {
    console.log('barabam');
  };

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    // console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };
  const category = setCategory();

  const getDetails = async () => {
    const receipe = await getReceipeDetails(category, id);
    // console.log('receipe', receipe);
    setShownReceipe(receipe);
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RecipeInstructions />
      <BtnsMenu />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finishRecipe }
      >
        Finish Recipe

      </button>
    </div>
  );
}

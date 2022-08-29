import React, { useContext, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import BtnsMenu from './BtnsMenu';
import RecipeInstructions from './RecipeInstructions';
import ReceipeContext from '../context/ReceipeContext';
import { getReceipeDetails } from '../servicesAPI/requests';

export default function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const { setShownReceipe, instructionsDone, shownReceipe } = useContext(ReceipeContext);

  const getIngredientsOrMeasures = (strTag) => {
    const initialArray = Object.entries(shownReceipe[0]);
    const filteredIngredients = initialArray
      .filter((array) => array[0].startsWith(strTag) && array[1])
      .map((ingredient) => ingredient[1]);
    return filteredIngredients;
  };

  const finishRecipe = () => {
    history.push('/done-recipes');
  };

  const enableButton = () => {
    const ingredients = getIngredientsOrMeasures('strIngredient');
    return (instructionsDone.length === ingredients.length);
  };

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    // console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };

  const getDetails = async () => {
    const receipe = await getReceipeDetails(setCategory(), id);
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
        disabled={ !enableButton() }
      >
        Finish Recipe

      </button>
    </div>
  );
}

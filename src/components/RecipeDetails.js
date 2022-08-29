import React, { useEffect, useContext } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import { getReceipeDetails } from '../servicesAPI/requests';
import '../style/RecipeDetails.css';
import DrinkDetails from './DrinkDetails';
import FoodDetails from './FoodDetails';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import BtnsMenu from './BtnsMenu';

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const { setShownReceipe } = useContext(ReceipeContext);

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

  const checkDoneRecipe = () => {
    const result = GetToLocalStorage('doneRecipes');
    return result?.some((item) => item.id === id);
  };

  const checkInProgressRecipes = () => {
    const inReturnResult = GetToLocalStorage('inProgressRecipes');
    if (inReturnResult) {
      const cocktailsIds = inReturnResult.cocktails
        ? Object.keys(inReturnResult.cocktails)
        : [];
      const mealsIds = inReturnResult.meals
        ? Object.keys(inReturnResult.meals)
        : [];
      const recipesIds = [...cocktailsIds, ...mealsIds];
      return recipesIds.some((itemId) => itemId === id);
    }
  };

  const redirectToRecipeInProgress = () => {
    if (setCategory() === 'foods') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      { setCategory() === 'foods' ? <FoodDetails /> : <DrinkDetails /> }
      <BtnsMenu />
      { !checkDoneRecipe() && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="startRecipeBtn"
          onClick={ redirectToRecipeInProgress }
        >
          { checkInProgressRecipes()
            ? 'Continue Recipe'
            : 'Start Recipe' }
        </button>) }
    </div>
  );
}

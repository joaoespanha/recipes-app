import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import '../style/RecipeDetails.css';
import { getReceipeDetails } from '../servicesAPI/requests';
import DrinkDetails from './DrinkDetails';
import FoodDetails from './FoodDetails';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import SetToLocalStorage from '../helpers/SetToLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { shownReceipe, setShownReceipe } = useContext(ReceipeContext);
  const [copyMessage, setCopyMessage] = useState(false);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState();

  const history = useHistory();
  const { pathname } = location;

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

  const favorites = () => GetToLocalStorage('favoriteRecipes');

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
    if (category === 'foods') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const setFavorite = () => {
    const getFavorite = favorites();
    const isFavorite = getFavorite?.some((item) => item.id === id);

    const favoriteObject = {
      id,
      type: (category === 'foods') ? 'food' : 'drink',
      nationality: shownReceipe[0]?.strArea ?? '',
      category: shownReceipe[0].strCategory,
      alcoholicOrNot: shownReceipe[0]?.strAlcoholic ?? '',
      name: shownReceipe[0]?.strMeal ?? shownReceipe[0]?.strDrink,
      image: shownReceipe[0]?.strMealThumb ?? shownReceipe[0]?.strDrinkThumb,
    };

    if (getFavorite?.length > 0 && !isFavorite) {
      SetToLocalStorage('favoriteRecipes', [...getFavorite, favoriteObject]);
    } else if (!isFavorite) {
      SetToLocalStorage('favoriteRecipes', [favoriteObject]);
    } else if (isFavorite) {
      const filtredLS = getFavorite.filter((recipe) => recipe.id !== id);
      SetToLocalStorage('favoriteRecipes', filtredLS);
    }

    setIsAlreadyFavorite(!isAlreadyFavorite);
    // console.log(GetToLocalStorage('favoriteRecipes'));
  };

  const copyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // console.log(window.location.href);
    setCopyMessage(true);
  };

  const findSrc = () => {
    const src = isAlreadyFavorite ? blackHeartIcon : whiteHeartIcon;

    return src;
  };

  useEffect(() => {
    const getFavorite = favorites();
    const isFavorite = getFavorite?.some((item) => item.id === id);
    getDetails();
    setIsAlreadyFavorite(isFavorite);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      { category === 'foods' ? <FoodDetails /> : <DrinkDetails /> }
      { copyMessage && <span>Link copied!</span>}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyShare }
      >
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        type="button"
        onClick={ setFavorite }
      >
        <img src={ findSrc() } data-testid="favorite-btn" alt="favorite btn" />
      </button>
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

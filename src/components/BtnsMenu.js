import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import ReceipeContext from '../context/ReceipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import SetToLocalStorage from '../helpers/SetToLocalStorage';
import shareIcon from '../images/shareIcon.svg';

export default function BtnsMenu() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { shownReceipe } = useContext(ReceipeContext);
  const [copyMessage, setCopyMessage] = useState(false);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState();

  const favorites = () => GetToLocalStorage('favoriteRecipes');

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    // console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };

  const category = setCategory();
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
  const findSrc = () => {
    const src = isAlreadyFavorite ? blackHeartIcon : whiteHeartIcon;

    return src;
  };
  const copyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // console.log(window.location.href);
    setCopyMessage(true);
  };
  useEffect(() => {
    const getFavorite = favorites();
    const isFavorite = getFavorite?.some((item) => item.id === id);
    setIsAlreadyFavorite(isFavorite);
    // eslint-disable-next-line
  }, []);
  return (
    <div style={ { marginLeft: '100px' } }>
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
    </div>
  );
}

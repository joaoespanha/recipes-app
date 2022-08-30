import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import ReceipeContext from '../context/ReceipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import SetToLocalStorage from '../helpers/SetToLocalStorage';
import shareIcon from '../images/shareIcon.svg';

export default function BtnsMenu({ index, idRecipe, type }) {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { shownReceipe, setfavoriteRecipeList } = useContext(ReceipeContext);
  const [copyMessage, setCopyMessage] = useState(false);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState();

  const favorites = () => GetToLocalStorage('favoriteRecipes');

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    return returnedCategory[0];
  };

  const favoriteObject = () => ({
    id,
    type: (setCategory() === 'foods') ? 'food' : 'drink',
    nationality: shownReceipe[0]?.strArea ?? '',
    category: shownReceipe[0].strCategory,
    alcoholicOrNot: shownReceipe[0]?.strAlcoholic ?? '',
    name: shownReceipe[0]?.strMeal ?? shownReceipe[0]?.strDrink,
    image: shownReceipe[0]?.strMealThumb ?? shownReceipe[0]?.strDrinkThumb,
  });

  const setFavorite = () => {
    const getFavorite = favorites();
    const isFavorite = getFavorite?.some((item) => item.id === id);
    if (getFavorite?.length > 0 && !isFavorite) {
      SetToLocalStorage('favoriteRecipes', [...getFavorite, favoriteObject()]);
    } else if (!isFavorite) {
      SetToLocalStorage('favoriteRecipes', [favoriteObject()]);
    } else if (isFavorite) {
      const filtredLS = getFavorite.filter((recipe) => recipe.id !== id);
      SetToLocalStorage('favoriteRecipes', filtredLS);
    }

    setIsAlreadyFavorite(!isAlreadyFavorite);
  };

  const findSrc = () => (isAlreadyFavorite ? blackHeartIcon : whiteHeartIcon);

  const copyShare = (path) => {
    const URL = window.location.href;
    if (path === '/favorite-recipes' || path === '/done-recipes') {
      const pathIndex = URL.indexOf(path);
      const formatedURL = `${URL.substring(0, pathIndex)}/${type}s/${idRecipe}`;
      navigator.clipboard.writeText(formatedURL);
    } else if (path.includes('/in-progress')) {
      const pathIndex = URL.indexOf('/in-progress');
      const formatedURL = URL.substring(0, pathIndex);
      navigator.clipboard.writeText(formatedURL);
    } else {
      navigator.clipboard.writeText(URL);
    }
    setCopyMessage(true);
  };

  const checkURL = (url) => pathname.includes(url);

  const disfavor = () => {
    const getFavorite = favorites();
    const filtredLS = getFavorite.filter((recipe) => recipe.id !== idRecipe);
    SetToLocalStorage('favoriteRecipes', filtredLS);
    setfavoriteRecipeList(filtredLS);
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
        onClick={ () => copyShare(pathname) }
      >
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share icon"
        />
      </button>
      {
        !(checkURL('done-recipes') || checkURL('favorite-recipes')) ? (
          <button
            type="button"
            onClick={ setFavorite }
          >
            <img src={ findSrc() } data-testid="favorite-btn" alt="favorite btn" />
          </button>
        ) : (
          <button
            type="button"
            onClick={ disfavor }
          >
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="disfavor btn"
            />
          </button>
        )
      }
    </div>
  );
}

BtnsMenu.propTypes = {
  index: PropTypes.number,
}.isRequired;

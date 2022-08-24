import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Card from './Card';
import SearchContext from '../context/SearchContext';
import { getStartRecipes } from '../servicesAPI/requests';

function Recipes({ recipeCategory }) {
  const { apiResponse, setApiResponse } = useContext(SearchContext);
  const maximumReceipes = 12;

  useEffect(() => {
    const setRecipes = async () => {
      const recipes = await getStartRecipes(recipeCategory);
      setApiResponse(recipes);
    };
    setRecipes();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      {
        apiResponse.map((_receipe, index) => (
          (index < maximumReceipes) && <Card
            key={ index }
            isMeal={ recipeCategory === 'foods' }
            index={ index }
          />))
      }
    </main>
  );
}

Recipes.propTypes = {
  recipeCategory: PropTypes.string,
}.isRequired;

export default Recipes;

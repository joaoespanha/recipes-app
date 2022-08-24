import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Card from './Card';
import SearchContext from '../context/SearchContext';
import { getStartRecipes } from '../servicesAPI/requests';

function Recipes({ recipesCategory }) {
  const { apiResponse, setApiResponse } = useContext(SearchContext);
  const maximumReceipes = 12;

  useEffect(() => {
    const setRecipes = async () => {
      const recipes = await getStartRecipes(recipesCategory);
      setApiResponse(recipes);
    };
    setRecipes();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      {
        apiResponse.map((recipe, index) => (
          (index < maximumReceipes) && <Card
            key={ index }
            isMeal={ recipesCategory === 'foods' }
            index={ index }
            recipeData={ recipe }
          />))
      }
    </main>
  );
}

Recipes.propTypes = {
  recipesCategory: PropTypes.string,
}.isRequired;

export default Recipes;

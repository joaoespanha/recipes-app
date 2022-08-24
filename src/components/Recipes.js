import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Card from './Card';
import SearchContext from '../context/SearchContext';
import CategoriesBtns from './CategoriesBtns';
import { getStartRecipes, getReceipesCategories } from '../servicesAPI/requests';

function Recipes({ recipesCategory }) {
  const { apiResponse,
    setApiResponse,
    setCategoriesBtnFilters,
  } = useContext(SearchContext);

  const maximumReceipes = 12;

  useEffect(() => {
    const setRecipes = async () => {
      const recipes = await getStartRecipes(recipesCategory);
      setApiResponse(recipes);
    };
    setRecipes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const setCategories = async () => {
      const categories = await getReceipesCategories(recipesCategory);

      setCategoriesBtnFilters(categories);
    };
    setCategories();
  }, []);

  return (
    <main>
      <CategoriesBtns />
      <section>
        {
          apiResponse?.map((recipe, index) => (
            (index < maximumReceipes) && <Card
              key={ index }
              isMeal={ recipesCategory === 'foods' }
              index={ index }
              recipeData={ recipe }
            />))
        }
      </section>
    </main>
  );
}

Recipes.propTypes = {
  recipesCategory: PropTypes.string,
}.isRequired;

export default Recipes;

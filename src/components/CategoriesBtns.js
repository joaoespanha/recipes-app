import React, { useContext, useState } from 'react';
import SearchContext from '../context/SearchContext';
import { getCategoryReceipes, getStartRecipes } from '../servicesAPI/requests';

export default function CategoriesBtns() {
  const {
    categoriesBtnFilters,
    setApiResponse,
    currentCategory,
  } = useContext(SearchContext);

  const [isFiltred, setIsFiltred] = useState(false);
  const maximumReceipes = 5;

  const setRecipes = async () => {
    const recipes = await getStartRecipes(currentCategory);
    setApiResponse(recipes);
  };

  const toogleCategory = async ({ target }) => {
    const receipes = await getCategoryReceipes(currentCategory, target.value);
    console.log(receipes);
    if (isFiltred) {
      await setRecipes();
    } else {
      setApiResponse(receipes);
    }
    setIsFiltred(!isFiltred);
  };

  const clearFilters = () => {
    setRecipes();
    setIsFiltred(false);
  };

  return (
    <div>
      { categoriesBtnFilters.map((btn, index) => (
        (index < maximumReceipes) && (
          <button
            type="button"
            onClick={ toogleCategory }
            key={ index }
            data-testid={ `${btn.strCategory}-category-filter` }
            value={ btn.strCategory }
          >
            {btn.strCategory}
          </button>
        )
      )) }
      <button
        type="button"
        onClick={ clearFilters }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

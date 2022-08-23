import React, { useContext, useEffect } from 'react';
import Card from './Card';
import SearchContext from '../context/SearchContext';
import { getStartRecipes } from '../servicesAPI/requests';

function Recipes() {
  const { apiResponse, setApiResponse, currentCategory } = useContext(SearchContext);
  const maximumReceipes = 12;

  useEffect(() => {
    const setRecipies = async () => {
      const recipies = await getStartRecipes(currentCategory);
      setApiResponse(recipies);
    };
    setRecipies();
  }, []);

  return (
    <main>
      {
        apiResponse.map((receipe, index) => (
          (((index < maximumReceipes) && (apiResponse.length > 0)) && (<Card
            key={ index }
            index={ index }
          />))))
      }
    </main>
  );
}

export default Recipes;

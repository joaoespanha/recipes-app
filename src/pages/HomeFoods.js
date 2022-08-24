import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function HomeFoods() {
  const { setCurrentCategory } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('foods');
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Foods" />
      <Recipes recipeCategory="foods" />
      <Footer />
    </div>
  );
}

export default HomeFoods;

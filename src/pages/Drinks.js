import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  const { setCurrentCategory } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('drinks');
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes recipesCategory="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;

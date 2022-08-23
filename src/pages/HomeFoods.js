import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';

function HomeFoods() {
  const { setCurrentCategory, apiResponse } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('foods');
    // eslint-disable-next-line
  }, []);

  const maximumReceipes = 12;

  return (
    <div>
      <Header title="Foods" />
      {
        apiResponse.map((receipe, index) => (
          (index < maximumReceipes && (<Card
            key={ index }
            isMeal
            index={ index }
          />))))
      }
      <Footer />
    </div>
  );
}

export default HomeFoods;

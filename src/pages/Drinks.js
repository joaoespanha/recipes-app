import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';

export default function Drinks() {
  const { setCurrentCategory, apiResponse } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('drinks');
    // eslint-disable-next-line
  }, []);

  const maximumReceipes = 12;

  return (
    <div>
      <Header title="Drinks" />
      {
        apiResponse.map((receipe, index) => (
          (index < maximumReceipes && (<Card
            key={ index }
            index={ index }
          />))))
      }
      <Footer />
    </div>
  );
}

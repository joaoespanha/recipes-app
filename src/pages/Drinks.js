import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';

export default function Drinks() {
  const { setCurrentCategory } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('drinks');
  }, []);

  return (
    <div>
      <Header title="Drinks" />
    </div>
  );
}

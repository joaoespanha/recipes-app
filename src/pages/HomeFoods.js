import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';

function HomeFoods() {
  const { setCurrentCategory } = useContext(SearchContext);

  useEffect(() => {
    setCurrentCategory('foods');
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header title="Foods" />
    </div>
  );
}

export default HomeFoods;

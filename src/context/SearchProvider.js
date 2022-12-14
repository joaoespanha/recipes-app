import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [currentSelected, setCurrentSelected] = useState('');
  const [apiResponse, setApiResponse] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('foods');
  const [categoriesBtnFilters, setCategoriesBtnFilters] = useState([]);

  return (
    <SearchContext.Provider
      value={ {
        currentSelected,
        setCurrentSelected,
        apiResponse,
        setApiResponse,
        inputSearch,
        setInputSearch,
        currentCategory,
        categoriesBtnFilters,
        setCategoriesBtnFilters,
        setCurrentCategory,
      } }
    >
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;

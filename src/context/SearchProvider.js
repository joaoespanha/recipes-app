import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [currentSelected, setCurrentSelected] = useState('');
  const [apiResponse, setApiResponse] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('foods');

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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

export default function SearchProvider({ children }) {
  const [currentSelected, setCurrentSelected] = useState('');
  const [apiResponse, setApiResponse] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  return (
    <SearchContext.Provider
      value={ {
        currentSelected,
        setCurrentSelected,
        apiResponse,
        setApiResponse,
        inputSearch,
        setInputSearch,
      } }
    >
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

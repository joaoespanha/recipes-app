import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(false);

  const toggleSearchBar = () => {
    setShowBar(!showBar);
  };

  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile icon"
        />
      </Link>
      {(title === 'Drinks' || title === 'Foods')
      && (
        <button
          onClick={ toggleSearchBar }
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search icon"
          />
        </button>
      )}
      { showBar
      && <SearchBar /> }
      <h2 data-testid="page-title">{title}</h2>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;

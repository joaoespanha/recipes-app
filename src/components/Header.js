import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <div>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile icon"
      />
      {(title === 'Drinks' || title === 'Foods')
      && (<img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search icon"
      />)}
      <h2 data-testid="page-title">{title}</h2>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;

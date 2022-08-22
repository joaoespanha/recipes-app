import React from 'react';
import { profileIcon, searchIcon } from '../images';

function Header() {
  return (
    <div>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile icon"
      />
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search icon"
      />
      <h2 data-testid="page-title">Temporário</h2>
    </div>
  );
}

export default Header;

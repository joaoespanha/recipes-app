import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GetToLocalStorage from '../helpers/GetToLocalStorage';
import '../style/profile.css';

export default function Profile({ history }) {
  const getEmailLocalStorage = () => {
    const userEmail = GetToLocalStorage('user');
    return userEmail?.email;
  };

  const pageRedirect = (url) => {
    history.push(url);
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div className="profileContent">
        <span data-testid="profile-email">{ getEmailLocalStorage() }</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => pageRedirect('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => pageRedirect('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

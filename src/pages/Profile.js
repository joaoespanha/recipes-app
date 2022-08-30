import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContext from '../context/LoginContext';

export default function Profile() {
  const { emailInput } = useContext(LoginContext);
  return (
    <div>
      <Header title="Profile" />
      <div>
        <span data-testid="profile-email">{ emailInput }</span>
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}

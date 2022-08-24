import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import HomeFoods from './pages/HomeFoods';
import SelectedFood from './pages/SelectedFood';
import InProgressFood from './pages/InProgressFood';
import Drinks from './pages/Drinks';
import SelectedDrink from './pages/SelectedDrink';
import InProgressDrink from './pages/InProgressDrink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import SearchProvider from './context/SearchProvider';
import ReceipeProvider from './context/ReceipeProvider';

function App() {
  return (
    <div>
      <Switch>
        <SearchProvider>
          <LoginProvider>
            <Route exact path="/" component={ Login } />
            <Route exact path="/profile" component={ Profile } />
          </LoginProvider>
          <ReceipeProvider>
            <Route path="/foods/:id" component={ SelectedFood } />
            <Route path="/foods/:id/in-progress" component={ InProgressFood } />
            <Route path="/drinks/:id" component={ SelectedDrink } />
            <Route path="/drinks/:id/in-progress" component={ InProgressDrink } />
          </ReceipeProvider>
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods" component={ HomeFoods } />

        </SearchProvider>
      </Switch>
    </div>
  );
}

export default App;

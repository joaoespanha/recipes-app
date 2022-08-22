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

function App() {
  return (
    <div>
      <Switch>
        <LoginProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ HomeFoods } />
          <Route path="/foods/:idfood" component={ SelectedFood } />
          <Route path="/foods/:idfood/in-progress" component={ InProgressFood } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/drinks/:iddrink" component={ SelectedDrink } />
          <Route path="/drinks/:iddrink/in-progress" component={ InProgressDrink } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </LoginProvider>
      </Switch>
    </div>
  );
}

export default App;

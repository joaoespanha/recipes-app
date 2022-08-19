import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import HomeFoods from './pages/HomeFoods';

function App() {
  return (
    <div>
      <Switch>
        <LoginProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ HomeFoods } />
        </LoginProvider>
      </Switch>
    </div>
  );
}

export default App;

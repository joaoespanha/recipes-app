import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from './ReceipeContext';

function ReceipeProvider({ children }) {
  const [shownReceipe, setShownReceipe] = useState([{}]);
  const [doneRecipeButton, setDoneRecipeButton] = useState(true);
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [favoriteRecipeList, setfavoriteRecipeList] = useState([]);

  return (
    <ReceipeContext.Provider
      value={ {
        shownReceipe,
        setShownReceipe,
        doneRecipeButton,
        setDoneRecipeButton,
        doneRecipesList,
        setDoneRecipesList,
        favoriteRecipeList,
        setfavoriteRecipeList,
      } }
    >
      { children }
    </ReceipeContext.Provider>
  );
}

ReceipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReceipeProvider;

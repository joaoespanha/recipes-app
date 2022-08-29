import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from './ReceipeContext';

function ReceipeProvider({ children }) {
  const [shownReceipe, setShownReceipe] = useState([{}]);
  const [doneRecipeButton, setDoneRecipeButton] = useState(true);
  const [doneRecipesList, setDoneRecipesList] = useState([]);

  return (
    <ReceipeContext.Provider
      value={ {
        shownReceipe,
        setShownReceipe,
        doneRecipeButton,
        setDoneRecipeButton,
        doneRecipesList,
        setDoneRecipesList,
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

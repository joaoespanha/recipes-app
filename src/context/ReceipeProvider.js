import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from './ReceipeContext';

function ReceipeProvider({ children }) {
  const [shownReceipe, setShownReceipe] = useState([{}]);
  const [doneRecipeButton, setDoneRecipeButton] = useState(true);

  return (
    <ReceipeContext.Provider
      value={ {
        shownReceipe,
        setShownReceipe,
        doneRecipeButton,
        setDoneRecipeButton,
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

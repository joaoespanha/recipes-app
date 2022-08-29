import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from './ReceipeContext';

function ReceipeProvider({ children }) {
  const [shownReceipe, setShownReceipe] = useState([{}]);
  const [doneRecipeButton, setDoneRecipeButton] = useState(true);
  const [instructionsDone, setInstructionsDone] = useState([]);

  return (
    <ReceipeContext.Provider
      value={ {
        shownReceipe,
        setShownReceipe,
        doneRecipeButton,
        setDoneRecipeButton,
        instructionsDone,
        setInstructionsDone,
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

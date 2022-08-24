import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceipeContext from './ReceipeContext';

function ReceipeProvider({ children }) {
  const [shownReceipe, setShownReceipe] = useState([{}]);
  return (
    <ReceipeContext.Provider
      value={ {
        shownReceipe,
        setShownReceipe,
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [disabled, setDisabled] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  // verificar se precisamos puxar o valor inicial do localstorage
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <LoginContext.Provider
      value={ {
        disabled,
        setDisabled,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

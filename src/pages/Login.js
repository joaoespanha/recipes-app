import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';
import SetToLocalStorage from '../helpers/SetToLocalStorage';

function Login({ history }) {
  const {
    disabled,
    setDisabled,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
  } = useContext(LoginContext);

  const verifyEmail = () => (/\S+@\S+\.\S+/).test(emailInput);

  const verifyPassword = () => passwordInput.length > Number('6');

  const verifyInputs = () => {
    if (verifyEmail() && verifyPassword()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    verifyInputs();
    // eslint-disable-next-line
  }, [emailInput, passwordInput]);

  const handleInput = ({ target }) => {
    const { value, name } = target;
    if (name === 'emailInput') setEmailInput(value);
    if (name === 'passwordInput') setPasswordInput(value);
  };

  const changePath = () => {
    const path = '/foods';
    SetToLocalStorage('user', { email: emailInput });
    SetToLocalStorage('mealsToken', 1);
    SetToLocalStorage('cocktailsToken', 1);
    history.push(path);
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        onChange={ handleInput }
        name="emailInput"
        placeholder="email@email.com"
        value={ emailInput }
      />
      <input
        data-testid="password-input"
        type="password"
        onChange={ handleInput }
        value={ passwordInput }
        placeholder="senha"
        name="passwordInput"
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        onClick={ changePath }
        disabled={ disabled }
        name="enterButton"
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  storageData: PropTypes.func,
}.isRequired;

export default Login;

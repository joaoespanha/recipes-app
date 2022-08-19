import React from 'react';

function Login() {
  const handleInput = ({ target }) => {
    const { value } = target;
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        onChange={ handleInput }
        name="email"
      />
      <input
        data-testid="password-input"
        type="password"
        onChange={ handleInput }
      />
      <button data-testid="login-submit-btn" type="submit">
        Entrar
      </button>
    </div>
  );
}

export default Login;

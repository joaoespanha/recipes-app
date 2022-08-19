import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import * as mocks from '../tests/helpers/mocks'

describe('Testando o componente Login', () => {
  test('Testa as funcionalidades da tela de Login', () => {
    const { history } = renderWithRouter(<App />, '/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();

    userEvent.type(emailInput, mocks.validEmail);
    userEvent.type(passwordInput, mocks.validPassword);
    userEvent.click(enterButton);

    const { location: { pathname }} = history;
    
    expect(pathname).toBe('/foods');
  });
  test('Testa se o botão está desabilitado caso os inputs sejam inválidos', () => {
    renderWithRouter(<App />, '/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, mocks.invalidEmail);
    userEvent.type(passwordInput, mocks.invalidPassword);
    
    expect(enterButton).toBeDisabled();
});
});
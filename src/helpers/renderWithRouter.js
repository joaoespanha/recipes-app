import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component, initialPath = '/') => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router path={ initialPath } history={ history }>{component}</Router>),
    history,
  });
};

export default renderWithRouter;

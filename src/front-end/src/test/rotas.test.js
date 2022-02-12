import React from 'react';
// import  from '../pages';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

import '@testing-library/jest-dom';

describe('1 - Teste de Rotas', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });
  test('Rota /', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/');
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });
  // test('Rota /, quando a rota for "/"', () => {
  //   history.push('/');
  //   expect(screen.getByText(/in Development/i)).toBeInTheDocument();
  // });
});

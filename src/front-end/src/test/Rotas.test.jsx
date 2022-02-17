import React from 'react';
// import  from '../pages';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { Tasks, CreateUser, LoginUser } from '../pages'

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../app/store'

describe('1 - Teste de Rotas', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('Rota /', () => {
    render(
      <Router history={history}>
        <LoginUser />
      </Router>
    );
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  test('Rota /createUser', () => {
    render(
      <Router history={history}>
        <CreateUser />
      </Router>
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  test('Rota /tasks', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Tasks />
        </Router>
      </Provider>
    );
    history.push('task');
    expect(screen.getByTestId('textArea-createTask-body')).toBeInTheDocument();
    expect(screen.getByTestId('select-createTask-status')).toBeInTheDocument();
    expect(screen.getByTestId('input-createTask-Title')).toBeInTheDocument();
  });
});

import React from 'react';
// import  from '../pages';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

import '@testing-library/jest-dom';

describe('1 - Teste da Página de Login', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  describe('Teste de verificação dos elementos na tela', () => {

    test('Existe uma mensagem de boas vindas na tela /', () => {
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    });

    test('Existe um input de Email na tela /', () => {
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      expect(screen.getByTestId('input-Email')).toBeInTheDocument();
    });

    test('Existe um input de Passoword na tela  /', () => {
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      expect(screen.getByTestId('input-Password')).toBeInTheDocument();
    });

    test('Existe um botão de submissão na tela  /', () => {
        render(
          <Router history={ history }>
            <App />
          </Router>,
        );
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

  });

});

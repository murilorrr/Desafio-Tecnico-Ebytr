import { createUser, loginUser, getAllTasks, createTask, updateTask } from '../api/api';

import '@testing-library/jest-dom';

const user = {
  name: 'MuriloRibeiro',
  email: 'murilorsv14@gmail.com',
  password: 'aaaaaa'
};

describe('Teste de verificação dos endpoints usados para logar', () => {
  test('testa o endpoint createUser', async () => {
    const response = await createUser(user);
    // expect(response.body)
  });

  test('testa o endpoint loginUser', () => {});

  test('testa o endpoint getAllTasks', () => {});

  test('testa o endpoint createTask', () => {});

  test('testa o endpoint updateTask', () => {});
});

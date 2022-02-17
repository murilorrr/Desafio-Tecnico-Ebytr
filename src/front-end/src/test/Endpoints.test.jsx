import { createUser, loginUser, getAllTasks, createTask, updateTask } from '../api/api';

import '@testing-library/jest-dom';

const user = {
  name: 'MuriloRibeiro',
  email: 'novo3Email@gmail.com',
  password: 'projetoToDo'
};

describe('Teste de verificação dos endpoints usados para logar', () => {
  test('testa o endpoint createUser', async () => {
    const { data: {user: {name, email, password, _id: id}} } = await createUser(user);
    expect(name).toBe(user.name);
    expect(email).toBe(user.email);
    expect(password).toBe(user.password);
    expect(id).not.toBeNull();
  });

  test('testa o endpoint loginUser', async () => {
    const { data: {token} } = await loginUser(user);
    expect(token).not.toBeNull();
  });

  test('testa o endpoint getAllTasks', () => {});

  test('testa o endpoint createTask', () => {});

  test('testa o endpoint updateTask', () => {});
});

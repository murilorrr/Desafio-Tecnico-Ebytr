import { createUser, loginUser, getAllTasks, createTask, updateTask } from '../api/api';
import { faker } from '@faker-js/faker';

import '@testing-library/jest-dom';

const factoryUser = () => {
  
  let randomName = '';
  const minNameLength = 13;
  while (randomName.length < minNameLength) {
    randomName = faker.name.findName();
  }

  const splitedName = randomName.split(' ');

  const passwordLength = 12;
  const randomEmail = faker.internet.email(splitedName[0], splitedName[1]);
  const randomPassword = faker.random.alphaNumeric(passwordLength);
  const userFake = { name: randomName, email: randomEmail, password: randomPassword };

  return userFake;
};

const user = factoryUser();

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

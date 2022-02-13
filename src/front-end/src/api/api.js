import axios from 'axios';

const baseURL = 'http://localhost:3001' || process.env.REACT_APP_HOST;

const api = axios.create({
  baseURL,
});

async function createUser(user) {
  const response = await api.post('/user', user)
  .then((response) => response.data)
  .catch((err) => console.log('erro post user', err.message));
  return response;
}

async function loginUser(user) {
  const token = await api.post('/login', user)
  .then((response) => response.data)
  .catch((err) => console.log('erro post login', err.message));
  return token;
}

async function getAllTasks(token) {
  const response = await api.get('/tasks', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
  .then((response) => response.data)
  .catch((err) => console.log('erro get all tasks', err.message));
  return response;
}

async function createTask(task, token) {
  const response = await api.post('/tasks', task, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
    .then((response) => response.data)
    .catch((err) => console.log('erro create task', err.message));
    return response;
}

async function updateTask(task, token) {
  const response = await api.put('/tasks', task, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
    .then((response) => response.data)
    .catch((err) => console.log('erro update task', err.message));
    return response;
}

export {
  createUser,
  loginUser,
  getAllTasks,
  createTask,
  updateTask,
};

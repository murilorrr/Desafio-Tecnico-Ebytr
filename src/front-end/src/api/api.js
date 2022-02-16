import axios from 'axios';

const baseURL = process.env.REACT_APP_HOST || 'http://localhost:3001';

const api = axios.create({
  baseURL
});

async function createUser(user) {
  const result = await api
    .post('/user', user)
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
}

async function loginUser(user) {
  const token = await api
    .post('/login', user)
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return token;
}

async function getAllTasks(token) {
  const result = await api
    .get('/task', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
}

async function createTask(task, token) {
  const result = await api
    .post('/task', task, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
}

async function updateTask(task, token, id) {
  const result = await api
    .put(`/task/${id}`, task, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
}

async function deleteTask(token, id) {
  const result = await api
    .delete(`/task/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
}

async function tokenValidate(token) {
  // token are a string
  const result = await api
    .post(
      '/token',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      }
    )
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { error: err.response.data.message };
    });
  return result;
  // retorn true or string error
}

export { createUser, loginUser, getAllTasks, createTask, updateTask, tokenValidate, deleteTask };

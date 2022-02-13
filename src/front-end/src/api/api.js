import axios from 'axios';

const baseURL = 'http://localhost:3001' || process.env.REACT_APP_HOST;

const api = axios.create({
  baseURL,
});

async function createUser(user) {
  const response = await api.post('/user', user)
  .then((response) => {
    return {data: response.data}
  })
  .catch((err) => {
    return {error: err.response.data.message};
  });
  return response;
}

async function loginUser(user) {
  const token = await api.post('/login', user)
  .then((response) => {
    return {data: response.data}
  })
  .catch((err) => {
    return { error: err.response.data.message };
  });
  return token;
}

async function getAllTasks(token) {
  const response = await api.get('/tasks', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
  .then((response) => {
    return {data: response.data}
  })
  .catch((err) => {
    return {error: err.response.data.message};
  });
  return response;
}

async function createTask(task, token) {
  const response = await api.post('/tasks', task, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
    .then((response) => {
      return {data: response.data}
    })
    .catch((err) => {
      return {error: err.response.data.message};
    });
    return response;
}

async function updateTask(task, token) {
  const response = await api.put('/tasks', task, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }})
    .then((response) => {
      return {data: response.data}
    })
    .catch((err) => {
      return {error: err.response.data.message};
    });
    return response;
}

async function tokenValidate(token) {
  // token are a string
  const response = await api.post('/token', token)
    .then((response) => {
      return {data: response.data}
    })
    .catch((err) => {
      return {error: err.response.data.message};
    });
    return response;
  // retorn true or false
}

export {
  createUser,
  loginUser,
  getAllTasks,
  createTask,
  updateTask,
  tokenValidate,
};

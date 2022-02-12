const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('../middleware');

const { user, login } = require('../routes');

const app = express();
app.use(bodyParser.json());

app.use('/user', user);

app.use('/login', login);

app.use(errorMiddleware);

module.exports = app;

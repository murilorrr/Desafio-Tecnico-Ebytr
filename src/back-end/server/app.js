const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorMiddleware } = require('../middleware');

const { user, login, token } = require('../routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', user);

app.use('/login', login);

app.use('/token', token);

app.use(errorMiddleware);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('../middleware');

// const routers = require('../routes');

const app = express();

app.use(bodyParser.json());

app.use(errorMiddleware);

module.exports = app;

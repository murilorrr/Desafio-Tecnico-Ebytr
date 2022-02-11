const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('../middleware');

// const routers = require('../routes');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errorMiddleware } = require('../middleware');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// src=https://www.npmjs.com/package/express-rate-limit

const { user, login, token } = require('../routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);

app.use('/user', user);

app.use('/login', login);

app.use('/token', token);

app.use(errorMiddleware);

module.exports = app;

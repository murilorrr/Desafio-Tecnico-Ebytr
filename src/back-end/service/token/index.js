require('dotenv').config();

const status = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const { errorHandler } = require('../../utils');

const validate = (token) => {
  try {
    const result = jwt.verify(token, secret);
    return !!result;
  } catch (e) {
    throw errorHandler(status.UNAUTHORIZED, 'jwt malformed or token expired');
  }
};

module.exports = {
  validate,
};

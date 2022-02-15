const dotenv = require('dotenv');

const status = require('http-status-codes').StatusCodes;
const JWT = require('jsonwebtoken');
const { errorHandler } = require('../utils');

dotenv.config();

const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  let token;
  try {
    const { authorization } = req.headers;
    token = authorization;
    const decoded = JWT.verify(token, secret);
    const { _id: id } = decoded.data;
    req.headers.id = id;
  } catch (err) {
    if (!token) throw errorHandler(status.UNAUTHORIZED, '"token" is required');
    throw errorHandler(status.UNAUTHORIZED, '"token" is not valid');
  }

  return next();
};

module.exports = authMiddleware;

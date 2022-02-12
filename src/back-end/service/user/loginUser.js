const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();
const status = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const User = require('../../model/Operations')('User');

const secret = process.env.SECRET || 'segredinho';
const { errorHandler } = require('../../utils');

const JWTConfig = {
  expiresIn: '1hr',
  algorithm: 'HS256',
};

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = async (email, password) => {
  const { error } = schema.validate({ email, password });
  if (error) throw errorHandler(status.UNAUTHORIZED, error.message);

  const user = await User.getOne(email, password);

  if (!user) throw errorHandler(status.UNAUTHORIZED, 'Incorrect username or password');

  const token = jwt.sign({ data: user }, secret, JWTConfig);
  return token;
};

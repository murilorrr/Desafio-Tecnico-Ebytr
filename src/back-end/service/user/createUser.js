const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { errorHandler } = require('../../utils/index');
const User = require('../../model')('User');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const alreadyExists = async (email) => {
  const user = await User.getOneByEmail(email);
  return user || null;
};

module.exports = async (user) => {
  const { email } = user;
  const { error } = userSchema.validate(user);
  if (error) throw errorHandler(StatusCodes.BAD_REQUEST, error.message);

  const exists = await alreadyExists(email);
  if (exists) { throw errorHandler(StatusCodes.CONFLICT, 'User already registered'); }

  await User.createOne(user);

  return { user };
};

const { StatusCodes } = require('http-status-codes');
const tokenService = require('../../service/token');

const validate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const result = tokenService.validate(authorization);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validate,
};

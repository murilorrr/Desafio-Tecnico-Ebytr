const { StatusCodes } = require('http-status-codes');
const userService = require('../../service/user');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await userService.loginUser(email, password);
    return res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    return next(err);
  }
};

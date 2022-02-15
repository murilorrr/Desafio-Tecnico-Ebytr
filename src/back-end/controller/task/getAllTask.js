const { StatusCodes } = require('http-status-codes');
const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  const userId = req.headers.id;
  try {
    const result = await taskService.getAll(userId);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};

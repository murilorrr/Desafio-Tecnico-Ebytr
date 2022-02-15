const { StatusCodes } = require('http-status-codes');
const taskService = require('../../service/task');

module.exports = async (_req, res, next) => {
  try {
    const result = await taskService.getAll();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return next(error);
  }
};

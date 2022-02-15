const { StatusCodes } = require('http-status-codes');
const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  const task = req.body;
  const userId = req.headers.id;
  task.userId = userId;
  try {
    const result = await taskService.create(task);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return next(error);
  }
};

const { StatusCodes } = require('http-status-codes');
const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  const task = req.body;
  const userId = req.headers.id;
  const taskId = req.params.id;
  task.userId = userId;
  try {
    const result = await taskService.updateOne(task, taskId);
    return res.status(StatusCodes.OK).json({ task: result });
  } catch (error) {
    return next(error);
  }
};

const { StatusCodes } = require('http-status-codes');
const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  const userId = req.headers.id;
  const taskId = req.params.id;
  try {
    await taskService.deleteOne(userId, taskId);
    return res.status(StatusCodes.NO_CONTENT).json({});
  } catch (error) {
    return next(error);
  }
};

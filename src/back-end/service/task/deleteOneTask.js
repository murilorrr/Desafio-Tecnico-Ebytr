const { StatusCodes } = require('http-status-codes');
const Task = require('../../model')('Task');
const { errorHandler } = require('../../utils');

module.exports = async (userId, taskId) => {
  let task;
  try {
    task = await Task.getById(taskId);
    if (task.userId === userId) await Task.deleteOne(taskId);
    return;
  } catch (err) {
    if (!task) throw errorHandler(StatusCodes.NOT_FOUND, 'não achei a tarefa');
    throw errorHandler(StatusCodes.UNAUTHORIZED, userId, 'não é o dono da tarefa');
  }
};

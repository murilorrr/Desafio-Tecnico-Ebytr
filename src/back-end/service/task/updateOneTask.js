const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { errorHandler } = require('../../utils/index');
const Task = require('../../model')('Task');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  status: Joi.string().required().valid('pendente', 'em andamento', 'pronto'),
  userId: Joi.string().required(),
});

module.exports = async (task, taskId) => {
  const { error } = taskSchema.validate(task);
  if (error) throw errorHandler(StatusCodes.BAD_REQUEST, error.message);

  const taskFromMongo = await Task.getById(taskId);

  if (taskFromMongo.userId === task.userId) {
    const result = await Task.updateOne(task, taskId);

    return result >= 1 ? { ...taskFromMongo, ...task } : errorHandler(StatusCodes.BAD_REQUEST, 'nada modificado');
  }

  throw errorHandler(StatusCodes.UNAUTHORIZED, 'voce não é o dono pilantra');
};

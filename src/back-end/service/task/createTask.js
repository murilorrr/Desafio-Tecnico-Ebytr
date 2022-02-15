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

module.exports = async (task) => {
  const { error } = taskSchema.validate(task);
  if (error) throw errorHandler(StatusCodes.BAD_REQUEST, error.message);

  // se houver uma task com esse titulo e esse body throw error
  const alreadExist = await Task.getOneTask(task.title, task.body);

  if (alreadExist) throw errorHandler(StatusCodes.CONFLICT, 'Alread Exists');

  await Task.createOne(task);

  return { task };
};

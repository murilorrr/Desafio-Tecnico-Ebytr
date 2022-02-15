const Task = require('../../model')('Task');

module.exports = async () => {
  try {
    const listTasks = await Task.getAll();
    return { tasks: listTasks };
  } catch (err) {
    return err.message;
  }
};

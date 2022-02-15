const Task = require('../../model')('Task');

module.exports = async (userId) => {
  try {
    const listTasks = await Task.getAll();
    listTasks.map((task) => {
      if (task.userId === userId) {
        task.your = true;
      } else {
        task.your = false;
      }
      return task;
    });
    console.log(listTasks, 'LISTA DE TAREFAS');
    return { tasks: listTasks };
  } catch (err) {
    return err.message;
  }
};

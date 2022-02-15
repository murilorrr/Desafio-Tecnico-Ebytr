const user = require('./userRouter');
const login = require('./loginRouter');
const token = require('./tokenRouter');
const task = require('./taskRouter');

module.exports = {
  user,
  login,
  token,
  task,
};

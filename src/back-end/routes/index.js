const user = require('./userRouter');
const login = require('./loginRouter');
const token = require('./tokenRouter');

module.exports = {
  user,
  login,
  token,
};

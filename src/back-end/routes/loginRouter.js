const { Router } = require('express');
const userController = require('../controller/user');

const router = new Router();

router.post('/', userController.login);

module.exports = router;

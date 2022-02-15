const { Router } = require('express');
const taskController = require('../controller/task');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, taskController.create);

module.exports = router;

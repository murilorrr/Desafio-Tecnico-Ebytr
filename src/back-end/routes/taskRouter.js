const { Router } = require('express');
const taskController = require('../controller/task');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, taskController.create);

router.get('/', authMiddleware, taskController.getAll);

router.put('/:id', authMiddleware, taskController.updateOne);

router.delete('/:id', authMiddleware, taskController.deleteOne);

module.exports = router;

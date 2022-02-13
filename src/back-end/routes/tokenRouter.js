const { Router } = require('express');
const tokenController = require('../controller/token');

const router = new Router();

router.post('/', tokenController.validate);

module.exports = router;

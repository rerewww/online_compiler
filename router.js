const express = require('express');
const controller = require('./server/controller');
const router = express.Router();

router.get('/', controller.index);
router.post('/compile', controller.compile);

module.exports = router;
const express = require('express');
const itemController = require('../controller/itemController');
const router = express.Router();

router.route('/:type')
.get(itemController.findItemsByType);

module.exports = router;
const express = require('express');
const itemController = require('../controller/itemController');
const router = express.Router();

router.route('/search-items')
.get(itemController.findItemsBySearchString);

router.route('/:id')
.get(itemController.findItemById);

module.exports = router;
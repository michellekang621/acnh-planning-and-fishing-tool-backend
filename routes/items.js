const express = require('express');
const itemController = require('../controller/itemController');
const router = express.Router();

router.route('/search-items')
.get(itemController.findItemsBySearchString);

router.route('/type/:itemType')
.get(itemController.findItemsByType);

router.route('/search-fish')
.get(itemController.findAvailableFish);

router.route('/:id')
.get(itemController.findItemById);

module.exports = router;
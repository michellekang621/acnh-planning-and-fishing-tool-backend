let itemModel = require('../models/ItemModel');

function findItemsByType(req, res, next) {
    return itemModel.findItemsByType(req.params.type)
    .then((items) => res.status(200).json(items))
    .catch((err) => next(err));
}

module.exports = {
    findItemsByType: findItemsByType,
}
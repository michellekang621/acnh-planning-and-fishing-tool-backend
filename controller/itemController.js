let itemModel = require('../models/ItemModel');

function findItemsByType(req, res, next) {
    return itemModel.findItemsByType(req.params.type)
    .then((items) => res.status(200).json(items))
    .catch((err) => next(err));
}

function findItemById(req, res, next) {
    return itemModel.findItemById(req.params.id)
    .then((item) => res.status(200).json(item))
    .catch((err) => next(err));
}

function findItemsBySearchString(req, res, next) {
    console.log(req.query.searchString);
    return itemModel.findItemsBySearchString(req.query.searchString)
    .then((items) => res.status(200).json(items))
    .catch((err) => next(err));
}

module.exports = {
    findItemsByType: findItemsByType,
    findItemById: findItemById,
    findItemsBySearchString: findItemsBySearchString,
}
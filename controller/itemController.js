let itemModel = require('../models/ItemModel');

function findItemsByType(req, res, next) {
    return itemModel.findItemsByType(req.params.itemType)
    .then((items) => res.status(200).json(items))
    .catch((err) => next(err));
}

function findAvailableFish(req, res, next) {
    console.log(req.query);
    return itemModel.findAvailableFish(req.query.hemisphere, req.query.month, req.query.time)
    .then((fish) => res.status(200).json(fish))
    .catch((err) => next(err));
}

function findAvailableBugs(req, res, next) {
    console.log(req.query);
    return itemModel.findAvailableBugs(req.query.hemisphere, req.query.month, req.query.time)
    .then((bugs) => res.status(200).json(bugs))
    .catch((err) => next(err));
}

function findAvailableSeaCreatures(req, res, next) {
    console.log(req.query);
    return itemModel.findAvailableSeaCreatures(req.query.hemisphere, req.query.month, req.query.time)
    .then((seas) => res.status(200).json(seas))
    .catch((err) => next(err));
}

function findItemById(req, res, next) {
    return itemModel.findItemById(req.params.id)
    .then((item) => res.status(200).json(item))
    .catch((err) => next(err));
}

function findItemsBySearchString(req, res, next) {
    return itemModel.findItemsBySearchString(req.query.searchString)
    .then((items) => res.status(200).json(items))
    .catch((err) => next(err));
}

module.exports = {
    findItemsByType: findItemsByType,
    findAvailableFish: findAvailableFish,
    findAvailableBugs: findAvailableBugs,
    findAvailableSeaCreatures: findAvailableSeaCreatures,
    findItemById: findItemById,
    findItemsBySearchString: findItemsBySearchString,
}
let userModel = require('../models/UserModel');

function findAllUsers(req, res, next) {
    return userModel.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}

module.exports = {
    findAllUsers: findAllUsers,
}
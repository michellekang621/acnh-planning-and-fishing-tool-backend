let userModel = require('../models/UserModel');

function findAllUsers(req, res, next) {
    return userModel.findAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}

function findUserById(req, res, next) {
    return userModel.findUserById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err));
}

function findGoalsByUser(req, res, next) {
    return userModel.findUserById(req.params.id)
    .then((user) => res.status(200).json(user.goals))
    .catch((err) => next(err));
}

function addGoalByUser(req, res, next) {
    return userModel.addGoalByUser(req.params.id, {title: req.body.goal, content: []})
    .then((msg) => res.status(200).json(msg))
    .catch((err) => next(err));
}

function findContentsByGoal(req, res, next) {
    return userModel.findContentsByGoal(req.params.id, req.params.goalId)
    .then((contents) => res.status(200).json(contents))
    .catch((err) => next(err));
}

function addContentByGoal(req, res, next) {
    return userModel.addContentByGoal(req.params.id, req.params.goalId, req.body.content)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => next(err));
}

module.exports = {
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findGoalsByUser: findGoalsByUser,
    addGoalByUser: addGoalByUser,
    findContentsByGoal: findContentsByGoal,
    addContentByGoal: addContentByGoal,

}
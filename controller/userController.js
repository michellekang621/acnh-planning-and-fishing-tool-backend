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
    return userModel.findGoalsByUser(req.params.id)
    .then((user) => res.status(200).json(user.goals))
    .catch((err) => next(err));
}

function addGoalByUser(req, res, next) {
    return userModel.addGoalByUser(req.params.id, {title: req.body.goal, content: []})
    .then((msg) => res.status(200).json(msg))
    .catch((err) => next(err));
}

function findGoalFromGoals(req, res, next) {
    return userModel.findGoalFromGoals(req.params.id, req.params.goalId)
    .then((goal) => res.status(200).json(goal))
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

function findContentFromContents(req, res, next) {
    return userModel.findContentFromContents(req.params.id, req.params.goalId, req.params.contentId)
    .then((content) => res.status(200).json(content))
    .catch((err) => next(err));
}

module.exports = {
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findGoalsByUser: findGoalsByUser,
    addGoalByUser: addGoalByUser,
    findGoalFromGoals: findGoalFromGoals,
    findContentsByGoal: findContentsByGoal,
    addContentByGoal: addContentByGoal,
    findContentFromContents: findContentFromContents,

}
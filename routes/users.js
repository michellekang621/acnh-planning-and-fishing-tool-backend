const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.route('/:id/goals/:goalId/contents')
.get(userController.findContentsByGoal);

router.route('/:id/goals/:goalId/contents')
.post(userController.addContentByGoal);

router.route('/:id/goals')
.get(userController.findGoalsByUser);

router.route('/:id/goals')
.post(userController.addGoalByUser);

router.route('/:id')
.get(userController.findUserById);

router.route('/')
.get(userController.findAllUsers);

module.exports = router;
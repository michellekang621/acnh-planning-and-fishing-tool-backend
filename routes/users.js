const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

// get a specific content of a specific goal
router.route('/:id/goals/:goalId/contents/:contentId')
.get(userController.findContentFromContents);

// remove one instance of a specific content of a specific goal
router.route('/:id/goals/:goalId/contents/:contentId')
.delete(userController.deleteContentByGoal);

// get the contents of a specific goal
router.route('/:id/goals/:goalId/contents')
.get(userController.findContentsByGoal);

// add a specific content to a specific goal
router.route('/:id/goals/:goalId/contents')
.post(userController.addContentByGoal);

// get a specific goal of a specific user
router.route('/:id/goals/:goalId')
.get(userController.findGoalFromGoals);

// get the goals of a specific user
router.route('/:id/goals')
.get(userController.findGoalsByUser);

// add a specific goal to a specific user
router.route('/:id/goals')
.post(userController.addGoalByUser);

// get a specific user
router.route('/:id')
.get(userController.findUserById);

// get all users
router.route('/')
.get(userController.findAllUsers);

module.exports = router;
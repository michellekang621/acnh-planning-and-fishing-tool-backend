const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now()
      },
      goals: {
        type: [{title: String, contents: [Object]}],
      }
}, {collection: 'users'})

const userModel = mongoose.model(
    'UserModel',
    userSchema
)

const findAllUsers = () => {
  return userModel.find({});
}

const instantiateNewUser = (username, email, password) => {
    return new userModel({
      username,
      email,
      password
  });
}

const findUserByEmail = (email) => {
  return userModel.findOne(email);
}

const findUserById = (id) => {
  return userModel.findById(id);
}

const findGoalsByUser = (id) => {
  return userModel.findById(id, 'goals');
}

const addGoalByUser = (id, goal) => {
  return userModel.findByIdAndUpdate(id, {$push: {goals: goal}});
}

const findGoalFromGoals = (id, goalId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(response => response.goals[0]);
}

const findContentsByGoal = (id, goalId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(user => {
    console.log(user);
    return user.goals[0].contents;
  });
}

const addContentByGoal = (id, goalId, content) => {
  return userModel.findOneAndUpdate({_id: id, 'goals._id': goalId}, {$push: {'goals.$.contents': content}});
}

const findContentFromContents = (id, goalId, contentId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(response => {
    console.log(response);
    return response.goals[0].contents.find(content => content._id === contentId);
  });
}

module.exports = {
  findUserByEmail: findUserByEmail,

  findAllUsers: findAllUsers,
  instantiateNewUser: instantiateNewUser,
  findUserById: findUserById,
  findGoalsByUser: findGoalsByUser,
  addGoalByUser: addGoalByUser,
  findGoalFromGoals: findGoalFromGoals,
  findContentsByGoal: findContentsByGoal,
  addContentByGoal: addContentByGoal,
  findContentFromContents: findContentFromContents,

};

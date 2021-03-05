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

const findOneUser = (email) => {
  return userModel.findOne(email);
}

const instantiateNewUser = (username, email, password) => {
    return new userModel({
      username,
      email,
      password
  });
}


const findUserById = (id) => {
  return userModel.findById(id);
}

const addGoalByUser = (id, goal) => {
  return userModel.findByIdAndUpdate(id, {$push: {goals: goal}});
}

const findContentsByGoal = (id, goalId) => {
  return userModel.findOne({_id: id}, {goals: {$elemMatch: {_id: goalId}}})
  .then(user => user.goals.contents);
}

const addContentByGoal = (id, goalId, content) => {
  console.log(goalId);
  console.log(content);
  return userModel.findOneAndUpdate({_id: id, 'goals._id': goalId}, {$push: {'goals.$.contents': content}})
  .then(user => {
    console.log(user);
  });
}

module.exports = {
  findAllUsers: findAllUsers,
  findOneUser: findOneUser,
  instantiateNewUser: instantiateNewUser,
  findUserById: findUserById,
  addGoalByUser: addGoalByUser,
  findContentsByGoal: findContentsByGoal,
  addContentByGoal: addContentByGoal,

};

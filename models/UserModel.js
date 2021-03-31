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
  return userModel.findByIdAndUpdate(id, {$push: {goals: {title: goal, content: []}}}, {new: true});
}

const findGoalFromGoals = (id, goalId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(response => response.goals[0]);
}

const findContentsByGoal = (id, goalId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(user => {
    return user.goals[0].contents;
  });
}

const addContentByGoal = (id, goalId, content) => {
  return userModel.findOneAndUpdate({_id: id, 'goals._id': goalId}, {$push: {'goals.$.contents': {item: content.item, type: content.type, itemId: content._id, _id: mongoose.Types.ObjectId()}}}, {new: true});
}

const findContentFromContents = (id, goalId, contentId) => {
  return userModel.findOne({_id: id}, {'goals': {$elemMatch: {_id: goalId}}})
  .then(response => {
    return response.goals[0].contents.find(content => content._id === contentId);
  });
}

const deleteContentByGoal = (id, goalId, contentId) => {
  return findGoalFromGoals(id, goalId)
  .then(res => {
    const initialContents = res.contents;
    const updatedContents = initialContents.filter(content => content._id.toString() !== contentId);
    return userModel.findOneAndUpdate({_id: id, 'goals._id': goalId}, {'goals.$.contents': updatedContents}, {new: true});
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
  deleteContentByGoal: deleteContentByGoal,
};

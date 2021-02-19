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
      }
}, {collection: 'users'})

const userModel = mongoose.model(
    'UserModel',
    userSchema
)

module.exports = userModel;

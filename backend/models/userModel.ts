import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 7,
    maxlength: 256
  },
  token: {
    type: String
  },
  role: {
    type: String
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User

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
  createdAt: {
    type: String,
    required: false
  },
  token: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  name: {
    type: String
  },
  userImage: {
    type: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
  profile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profile' }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User

import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
  location: {
    type: String
  },
  aboutMe: {
    type: String,
    required: true
  },
  createdAt: String,

  nickName: {
    type: String
  },
  name: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
})

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile
// 1234567

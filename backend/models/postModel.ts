import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: String,
  username: String,
  published: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  imageUrl: {
    type: String
  },
  userImage: {
    type: String
  },
  comments: [
    {
      content: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post
// 1234567

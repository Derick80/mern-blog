import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  username: String,
  createdAt: String,
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post

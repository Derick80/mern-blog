import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: String,
  likes: [
    {
      likedBy: String,
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

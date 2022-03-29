import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  name: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  imageUserName: {
    type: String
  },
  imageUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Gallery = mongoose.model('Gallery', GallerySchema)
module.exports = Gallery

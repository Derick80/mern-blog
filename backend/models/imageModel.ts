import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  type: 'String',
  data: Buffer
})

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image

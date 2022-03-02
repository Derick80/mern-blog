import { parse } from 'path'

const Post = require('../models/postModel')
import Image = require('../models/imageModel')
const authMiddleware = require('../middleware/auth-middleware')
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')
module.exports = {
  Query: {},
  Upload: GraphQLUpload,

  Mutation: {
    uploadFile: async (parent, { file }, context: any) => {
      const { createReadStream, postImageUrl, filename, mimetype, encoding } =
        await file

      const stream = createReadStream()
      let { ext, name } = parse(filename)

      name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_')

      return stream.pipe
    }
  }
}

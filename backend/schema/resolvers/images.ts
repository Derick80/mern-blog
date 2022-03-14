import { UserInputError } from 'apollo-server-core'
import { createReadStream } from 'fs'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

const { createWriteStream } = require('fs')

import { imageBucket } from '../../config/lib/files/config'
import {
  checkFileSize,
  generateUniqueFilename,
  uploadToGoogleCloud
} from '../../config/utils/fileOperations'
import { FileArgs } from '../../config/utils/types'
const imageUrl = ''
module.exports = {
  Query: {
    imageUrl: () => imageUrl
  },
  Upload: GraphQLUpload,

  Mutation: {
    uploadFile: async (parent: any, args: FileArgs) => {
      const { filename, mimetype, createReadStream } = await args.file
      // first check file size before proceeding
      try {
        const oneGb: number = 1000000000
        await checkFileSize(createReadStream, oneGb)
      } catch (error) {
        if (typeof error === 'number') {
          throw new UserInputError('Maximum file size is 1GB')
        }
      }
      // generate a scrubbed unique filename
      const uniqueFilename = generateUniqueFilename(filename)
      // upload to Google Cloud Storage
      try {
        const url = await uploadToGoogleCloud(createReadStream, uniqueFilename)
        const imageUrl = `https://storage.googleapis.com/blog_bucket_dch/${uniqueFilename}`

        return {
          imageUrl
        }
      } catch (err) {
        throw new UserInputError('Error with uploading to Google Cloud')
      }
    }
  }
}

// uploadPostImage: async (parent: any, { file }: FileArgs) => {
//   const { filename, mimetype, createReadStream } = await file
//   // first check file size before proceeding
//   try {
//     const oneGb: number = 1000000000
//     await checkFileSize(createReadStream, oneGb)
//   } catch (error) {
//     if (typeof error === 'number') {
//       throw new UserInputError('Maximum file size is 1GB')
//     }
//   }
//   // generate a scrubbed unique filename
//   const uniqueFilename = generateUniqueFilename(filename)
//   console.log(file, filename)
//   // upload to Google Cloud Storage
//   try {
//     await uploadToGoogleCloud(createReadStream, uniqueFilename)
//   } catch (error) {
//     throw new UserInputError('Error with uploading to Google Cloud')
//   }
//   return `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`
// }

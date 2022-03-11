import { createReadStream } from 'fs'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

const { createWriteStream } = require('fs')

import { imageBucket } from '../../config/lib/files/config'

const files: any[] = []
module.exports = {
  Query: {
    files: () => files
  },
  Upload: GraphQLUpload,

  Mutation: {
    uploadFile: async (_: any, { file }: any) => {
      const { filename, createReadStream } = await file
      console.log(filename)

      await new Promise((res) =>
        createReadStream()
          .pipe(
            imageBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on('finish', res)
      )
      files.push(filename)
      return true
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

import { UserInputError } from 'apollo-server-core'
import { createReadStream } from 'fs'
import { GraphQLUpload } from 'graphql-upload'

import {
  checkFileSize,
  GalleryResponseTypes,
  generateUniqueFilename,
  storeUpload
} from '../../config/utils/galleryOperations'
import { FileArgs } from '../../config/utils/types'

const Gallery = require('../../models/galleryModel')
const checkAuth = require('../../middleware/check-auth')

module.exports = {
  Upload: GraphQLUpload,

  Query: {
    getUserImageGallery: async (_: any, _args: any, context: any) => {
      const { user } = checkAuth(context)

      try {
        const userImageGallery = await Gallery.find({
          imageUserId: user.id
        })
        return userImageGallery
      } catch (error) {
        throw new Error("We didn't find any Images owned by this User")
      }
    }
  },
  Mutation: {
    addImage: async (parent: any, args: FileArgs, context: any) => {
      const { createReadStream, filename } = await args.file
      const { user } = checkAuth(context)

      // generate a scrubbed unique filename
      const uniqueFilename = generateUniqueFilename(filename)
      // upload to Google Cloud Storage
      try {
        const uploadedFile = await storeUpload(
          createReadStream,
          uniqueFilename,
          context
        )

        return
      } catch (err) {
        throw new UserInputError('Error with uploading to Google Cloud')
      }
    },
    createGalleryEntry: async (
      _: any,
      { input: { picture, name } }: any,
      context: any
    ) => {
      const { imageUrl } = await processUpload(picture)
      const { user } = checkAuth(context)
      console.log()

      try {
        const newGallery = new Gallery({
          name: name,
          imageUrl: imageUrl,
          imageUserId: user.id,
          imageUserName: user.username,
          createdAt: new Date().toISOString()
        })

        const gallery = await newGallery.save()
        console.log('gallery', gallery)

        return true
      } catch (error) {
        throw new Error('unable to save')
      }
    }
  }
}

const processUpload = async (upload: any) => {
  const { createReadStream, filename, context } = await upload

  const { imageUserId, imageUrl, name } = await storeUpload(
    createReadStream,
    filename,
    context
  )
  return { imageUrl, imageUserId, filename, name }
}

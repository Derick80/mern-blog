import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { v4 as uuid } from 'uuid'
import { bucket } from '../lib/files/config'
const checkAuth = require('../../middleware/check-auth')
export interface GalleryResponseTypes {
  name?: string
  imageUrl: string
  imageUserId?: string
}
export const checkFileSize = (
  createReadStream: FileUpload['createReadStream'],
  maxSize: number
) =>
  new Promise((resolves, rejects) => {
    let filesize = 0
    let stream = createReadStream()
    stream.on('data', (chunk: Buffer) => {
      filesize += chunk.length
      if (filesize >= maxSize) {
        rejects(filesize)
      }
    })
    stream.on('end', () => resolves(filesize))
    stream.on('error', rejects)
  })

export const generateUniqueFilename = (filename: string): string => {
  // step 1 - scrub filenname to remove spaces
  const trimmedFilename = filename.replace(/\s+/g, `-`)

  // step 2 - ensure filename is unique by appending a UUID
  const unique = uuid()

  // step 3 - return the unique filename
  return `${unique}-${trimmedFilename}`
}

export const storeUpload = (
  createReadStream: FileUpload['createReadStream'],
  filename: string,
  context: any
): Promise<GalleryResponseTypes> => {
  const imageUrl =
    `https://storage.googleapis.com/blog_bucket_dch/${filename}`.toString()

  // step 1 - upload the file to Google Cloud Storage
  return new Promise((resolves, rejects) =>
    createReadStream()
      .pipe(
        bucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true
        })
      )
      .on('error', (err: any) => rejects(err)) // reject on error
      .on('finish', () => resolves({ imageUrl }))
  ) // resolve on finish
}

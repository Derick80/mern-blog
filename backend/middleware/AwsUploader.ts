import AWS from 'aws-sdk'
import stream from 'stream'
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')

import { ApolloServerFileUploads } from '../config/utils/streamTypes'
type S3UploadConfig = {
  accessKeyId: string | undefined
  secretAccessKey: string | undefined
  destinationBucketName: string
  region?: string
}
type S3UploadStream = {
  writeStream: stream.PassThrough
  promise: Promise<AWS.S3.ManagedUpload.SendData>
}

export class AWSS3Uploader implements ApolloServerFileUploads.IUploader {
  private s3: AWS.S3
  public config: S3UploadConfig

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config()
    AWS.config.update({
      region: config.region || 'us-east-2',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    })

    this.s3 = new AWS.S3()
    this.config = config
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough()
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass
        })
        .promise()
    }
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ) {
    return fileName
  }

  async singleUpload(
    parent: any,
    { file }: { file: ApolloServerFileUploads.File }
  ) {
    const { stream, filename, mimetype, encoding } = await file

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    )

    // Create an upload stream that goes to S3
    const uploadStream = this.createUploadStream(filePath)

    // Pipe the file data into the upload stream
    stream.pipe(uploadStream.writeStream)
    // Start the stream
    const result = await uploadStream.promise
    // Create an upload stream that goes to S3
    // Pipe the file data into the upload stream
    // Get the link representing the uploaded file
    // (optional) save it to our database

    // (optional) save it to our database

    return { filename, mimetype, encoding, url: result.Location }
  }
}

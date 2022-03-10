import * as S3 from 'aws-sdk/clients/s3'
import AWS from 'aws-sdk'
import { Observable, of } from 'rxjs'
// ts-lint-disable-rest-of-files/disable
class FileUpload {
  name: string
  url: string

  constructor(name: string, url: string) {
    this.name = name
    this.url = url
  }
  result: any[]
}

class S3Controller {
  FOLDER = 'my_foler' // For example, 'my_folder'.
  BUCKET = 'dchbucket80' // For example, 'my_bucket'.

  private static getS3Bucket(): any {
    return new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-2'
    })
  }

  public uploadFile(file) {
    const bucket = new AWS.S3({
      region: 'us-east-2',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    const params = {
      Bucket: this.BUCKET,
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    }

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('there was an error uploading file: ', err)
        return false
      }
      console.log('success', data)
      return true
    })
  }

  public getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = []

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    }

    S3Controller.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err)
        return
      }
      console.log('Successfully get files.', data)

      const fileDetails = data.Contents

      fileDetails.forEach((file) => {
        fileUploads.push(
          new FileUpload(
            file.Key,
            'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key
          )
        )
      })
    })

    return of(fileUploads)
  }
}

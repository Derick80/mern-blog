import { Storage } from '@google-cloud/storage'
const path = require('path')

require('dotenv').config()

const storage = new Storage({
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
      ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
      : ''
  },
  projectId: 'homeprojects-343720'
})

storage.getBuckets().then((x) => console.log(x))
export const imageBucket = storage.bucket('blog_bucket_dch')

export const bucket = storage.bucket('blog_bucket_dch')

// projectId: process.env.GCP_PROJECT_ID,
//   credentials: {
//     client_email: process.env.GCP_CLIENT_EMAIL,
//     private_key: process.env.GCP_PRIVATE_KEY
//       ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
//       : ''
//   }

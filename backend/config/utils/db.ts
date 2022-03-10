const mongoose = require('mongoose')

async function connectDb() {
  const dbUri = process.env.MONGO_URI

  try {
    await mongoose.connect(dbUri)
  } catch (error) {
    console.error('Could not connect to Mongo')
    process.exit(1)
  }
}

module.exports = connectDb

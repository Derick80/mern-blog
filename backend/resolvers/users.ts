const User = require('../models/userModel')

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find()
        return users
      } catch (error) {
        throw new Error('We did not find any users')
      }
    }
  }
}

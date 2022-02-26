const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
  },
  Mutation: {
    register: async (
      _source: unknown,
      { registerInput: { username, email, password, confirmPassword } }: any,
      _context: any,
      _info: any
    ): Promise<any> => {
      //validate user data
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password
      })

      const res = await newUser.save()

      const token = jwt.sign(
        {
          id: res._id,
          email: res.email,
          username: res.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '30 days' }
      )

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}

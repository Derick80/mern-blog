const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

function generateToken(user: any) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: '30 days' }
  )
}

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
    },
    login: async (_source: unknown, { username, password }: any) => {
      const user = await User.findOne({ username })

      if (!user) {
        console.log(`User ${username} not found`)
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        console.log(`Invalid credentials`)
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  }
}

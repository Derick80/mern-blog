import { AuthenticationError } from 'apollo-server-express'

const jwt = require('jsonwebtoken')

module.exports = (context: { req: any }) => {
  //context = {...headers}
  const token = context.req.headers.authorization || ''
  //bearer
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      return { user }
    } catch (error) {
      throw new AuthenticationError('invalid or expired token')
    }
  }
  throw new Error('Auth token must be  `Bearer [token]`....')
}

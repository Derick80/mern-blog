import { AuthenticationError } from 'apollo-server-express'
import { Request } from 'express'

const jwt = require('jsonwebtoken')

module.exports = (context: { req: Request }): { user: typeof User } => {
  //context = {...headers}
  const authHeader = context.req.headers.authorization
  if (authHeader) {
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
  throw new Error('Authorization header must be provided')
}

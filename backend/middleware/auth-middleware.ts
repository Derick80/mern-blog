import { AuthenticationError } from 'apollo-server-express'

const jwt = require('jsonwebtoken')

module.exports = (context: { req: { headers: { authorization: any } } }) => {
  //context = {...headers}
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    //bearer
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        return user
      } catch (error) {
        throw new AuthenticationError('invalid or expired token')
      }
    }
    throw new Error('Auth toekn must be ....')
  }
  throw new Error('Authentication  header must be provided')
}

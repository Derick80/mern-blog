const usersResolver = require('./users')
const postsResolver = require('./posts')
module.exports = {
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation
  }
}

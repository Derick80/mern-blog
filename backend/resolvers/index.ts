const usersResolver = require('./users')
const postsResolver = require('./posts')
module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length
  },
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation
  }
}

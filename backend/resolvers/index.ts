const usersResolver = require('./users')
const postsResolver = require('./posts')
const imagesResolver = require('./image')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length
  },
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query,
    ...imagesResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...imagesResolver.Mutation
  }
}

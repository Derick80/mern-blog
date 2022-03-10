const usersResolver = require('./users')
const postsResolver = require('./posts')

module.exports = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length
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

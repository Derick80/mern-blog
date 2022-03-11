const usersResolver = require('./users')
const postsResolver = require('./posts')
const imagesResolver = require('./images')

module.exports = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length
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

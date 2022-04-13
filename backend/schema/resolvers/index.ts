const usersResolver = require('./users')
const postsResolver = require('./posts')
const commentsResolver = require('./comments')

module.exports = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length
  },
  Upload: {
    ...postsResolver.Upload
  },
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation
  }
}

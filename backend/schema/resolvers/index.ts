const usersResolver = require('./users')
const postsResolver = require('./posts')
const commentsResolver = require('./comments')
const profilesResolver = require('./profiles')

module.exports = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length
  },
  Upload: {
    ...postsResolver.Upload,
    ...profilesResolver.Upload
  },
  Query: {
    ...usersResolver.Query,
    ...postsResolver.Query,
    ...profilesResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
    ...profilesResolver.Mutation
  }
}

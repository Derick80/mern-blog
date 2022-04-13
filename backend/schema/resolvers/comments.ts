import { AuthenticationError, UserInputError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
const Post = require('../../models/postModel')

const checkAuth = require('../../middleware/check-auth')

module.exports = {
  Mutation: {
    createComment: async (_: any, { postId, content }: any, context: any) => {
      const { user } = checkAuth(context)
      if (content.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            content: 'Comment content must not empty'
          }
        })
      }

      const post = await Post.findById(postId)

      if (post) {
        post.comments.unshift({
          content,
          username: user.username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    async deleteComment(_: any, { postId, commentId }: any, context: any) {
      const { user } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        const commentIndex = post.comments.findIndex(
          (c: any) => c.id === commentId
        )

        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    }
  }
}

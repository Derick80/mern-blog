const Post = require('../models/postModel')
const authMiddleware = require('../middleware/auth-middleware')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
        return posts
      } catch (error) {
        throw new Error("We didn't find any posts")
      }
    },
    async getPostbyId(_: any, { postId }: any) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error('errors')
      }
    }
  },
  Mutation: {
    createPost: async (
      _: any,
      { postCreateInput: { title, content } }: any,
      context: any
    ) => {
      const user = authMiddleware(context)

      const newPost = new Post({
        title,
        content,
        author: user.id,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()

      return post
    }
  }
}

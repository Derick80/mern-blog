const Post = require('../../models/postModel')
const checkAuth = require('../../middleware/check-auth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({ published: true })
        return posts
      } catch (error) {
        throw new Error("We didn't find any posts")
      }
    },
    getDraftPosts: async (_: any, _args: any, context: any) => {
      const { user } = checkAuth(context)

      try {
        const posts = await Post.find({
          published: false,
          username: user.username
        })
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
      { postInput: { title, content, imageUrl } }: any,
      context: any
    ) => {
      const { user } = checkAuth(context)
      console.log(user)
      const newPost = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        username: user.username,
        author: user.id,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()

      return post
    },
    editPost: async (
      _: any,
      { postUpdateInput: { title, content, imageUrl, postId } }: any,
      context: any
    ) => {
      const updatePost = await Post.findByIdAndUpdate(postId, {
        title,
        content,
        imageUrl,
        published: true
      })

      return updatePost
    },
    publishPost: async (
      _: any,
      { args: { title, content, imageUrl, postId } }: any,

      context: any
    ) => {
      const { user } = checkAuth(context)
      console.log(user)
      const updatePost = await Post.findById(postId)
      if (updatePost) {
        Post({
          title,
          content,
          imageUrl,
          published: true,

          createdAt: new Date().toISOString()
        })
      }
      const post = await updatePost.save(postId)

      return post
    },
    likePost: async (_: any, { postId }: any, context: any) => {
      const { user } = checkAuth(context)
      console.log(user.username)
      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find((like: any) => like.likedBy === user.username)) {
          //Post already liked, soi
          post.likes = post.likes.filter(
            (like: any) => like.likedBy !== user.username
          )
        } else {
          //Post not liked , like post

          post.likes.push({
            likedBy: user.username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new Error(`post not found`)
    }
  }
}

import { AuthenticationError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
import { storeUpload } from '../../config/utils/postAndImageOperations'

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
    getPostbyId: async (_: any, postId: string, context: any) => {
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
  Upload: GraphQLUpload,

  Mutation: {
    createPost: async (
      _: any,
      { postInput: { title, content, imageUrl } }: typeof Post,
      context: any
    ) => {
      const { user } = checkAuth(context)
      console.log(user)
      const newPost = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        userImage: user.userImage,
        username: user.username,
        author: user.id,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()

      return post
    },
    deletePost: async (_: any, { postId }: any, context: any) => {
      try {
        const post = await Post.findById(postId)
        console.log('backend post deletion log', post)

        await post.delete()
        return 'Post Deleted'
      } catch (error) {
        throw new Error('unable to delete')
      }
    },
    editPost: async (
      _: any,
      { input: { picture, title, content, name, postId } }: any,
      context: any
    ) => {
      const { user } = checkAuth(context)

      try {
        if (picture) {
          const { imageUrl } = await processUpload(picture)
          const updatePost = await Post.findByIdAndUpdate(postId, {
            title,
            content,
            imageUrl: imageUrl,
            imageUserId: user.id,
            imageUserName: user.username,
            name
          })
          const post = await updatePost.save()
          console.log('first try', post)

          return post
        } else {
          const updatePost = await Post.findByIdAndUpdate(postId, {
            title,
            content,
            name
          })
          const post = await updatePost.save()
          console.log('2nd try', post)
          return post
        }
      } catch (error) {
        throw new Error('unable to save')
      }
    },
    publishPost: async (
      _: any,
      { postId }: any,

      context: any
    ) => {
      const updatePost = await Post.findByIdAndUpdate(postId, {
        published: true
      })

      const post = await updatePost.save()

      return post
    },
    likePost: async (_: any, { postId }: any, context: any) => {
      const { user } = checkAuth(context)
      console.log('username', user.username)
      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find((like: any) => like.username === user.username)) {
          //Post already liked, so unlike it
          post.likes = post.likes.filter(
            (like: any) => like.username !== user.username
          )
        } else {
          //Post not liked , like post

          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new Error(`post not found`)
    },
    createPostandImage: async (
      _: any,
      { input: { picture, name, title, content } }: any,
      context: any
    ) => {
      const { imageUrl } = await processUpload(picture)
      const { user } = checkAuth(context)

      try {
        const newPostandImage = new Post({
          title: title,
          content: content,
          username: user.username,
          name: name,
          imageUrl: imageUrl,
          userImage: user.userImage,
          imageUserId: user.id,
          imageUserName: user.username,
          author: user.id,
          createdAt: new Date().toISOString()
        })
        const postAndImage = await newPostandImage.save()
        console.log('postandImage', postAndImage)
        return postAndImage
      } catch (error) {
        throw new Error('unable to save')
      }
    }
  }
}

const processUpload = async (upload: any) => {
  const { createReadStream, filename, context } = await upload

  const { imageUserId, imageUrl, name } = await storeUpload(
    createReadStream,
    filename,
    context
  )
  return { imageUrl, imageUserId, filename, name }
}

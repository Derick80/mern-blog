import { gql } from 'apollo-server-express'

const typeDefs = gql`
  scalar Upload

  type File {
    imageUrl: String
    filename: String
    mimetype: String
    encoding: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String
    token: String!
    role: String!
  }
  type Query {
    getUsers: [User]
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    username: String!
    createdAt: String
    imageUrl: String
    author: String!
    published: Boolean
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]
    commentCount: Int
  }
  type Like {
    id: ID!
    createdAt: String!
    likedBy: String!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    content: String!
  }
  type Query {
    getPosts: [Post]
    getDraftPosts: [Post]
    getPostbyId(postId: ID!): Post
    imageUrl: String
    uploads: [File]
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input PostInput {
    title: String!
    content: String!
    imageUrl: String
  }
  input PostUpdateInput {
    postId: ID!
    title: String!
    content: String!
    imageUrl: String
  }
  type Mutation {
    uploadFile(file: Upload!): File!
    editPost(id: ID!): Post!
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    createPost(postInput: PostInput!): Post!
    publishPost(
      postId: String!
      content: String!
      title: String!
      imageUrl: String
    ): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`
module.exports = typeDefs

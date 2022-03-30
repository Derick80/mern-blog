import { gql } from 'apollo-server-express'

const typeDefs = gql`
  scalar Upload

  type File {
    imageUrl: String
    userId: String
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
    imageUserId: String!
    imageUserName: String!
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
  type Gallery {
    id: ID!
    createdAt: String!
    imageUrl: String!
    imageUserId: String!
    imageUserName: String!
  }
  type GalleryResponse {
    id: ID!
    name: String
    createdAt: String!
    imageUrl: String
    imageUserId: String
  }
  type Query {
    getPosts: [Post]
    getDraftPosts: [Post]
    getPostbyId(postId: ID!): Post
    imageUrl: String
    uploads: [File]
    getUserImageGallery: [Gallery]
    imageUploads: [Gallery]
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
  input CreateGalleryEntry {
    picture: Upload!
    name: String!
    imageUrl: String
    imageUserId: String
    createdAt: String
  }
  input CreatePostandImage {
    picture: Upload!
    name: String!
    imageUrl: String
    imageUserId: String
    title: String!
    content: String!
    createdAt: String
  }
  type Mutation {
    addImage(file: Upload!): Boolean
    uploadFile(file: Upload!): File!
    createGalleryEntry(input: CreateGalleryEntry!): Boolean
    createPostandImage(input: CreatePostandImage!): Boolean
    editPost(postUpdateInput: PostUpdateInput): Post!
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    createPost(postInput: PostInput!): Post!
    publishPost(postId: ID!): String!
    deletePost(postId: ID!): String!
    createComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`
module.exports = typeDefs

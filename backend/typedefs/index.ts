import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
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
    author: String!
    likes: [Like]!
    likeCount: Int!
  }
  type Like {
    id: ID!
    createdAt: String!
    likedBy: String!
  }
  type Query {
    getPosts: [Post]
    getPostbyId(postId: ID!): Post
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input PostCreateInput {
    title: String!
    content: String!
  }
  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    createPost(postCreateInput: PostCreateInput!): Post
    likePost(postId: ID!): Post!
    # deletePost(postId: ID!): String!
  }
`
module.exports = typeDefs

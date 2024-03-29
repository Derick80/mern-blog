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
    name: String
    userImage: String
    profile: [Profile]
    posts: [Post]!
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
    name: String
    published: Boolean
    userImage: String
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]
    commentCount: Int
    imageUserId: String
    imageUserName: String
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String
    content: String!
  }
  type Profile {
    id: ID!
    createdAt: String!
    location: String!
    aboutMe: String!
    avatarUrl: String!
    nickName: String!
    username: String!
    email: String!
    userId: ID!
    name: String!
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
    getCurrentUser: User
    imageUrl: String
    uploads: [File]
    getUserImageGallery: [Gallery]
    imageUploads: [Gallery]
    getProfiles: [Profile]
    getUserProfile: [Profile]
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
    userImage: String

    title: String!
    content: String!
    createdAt: String
  }

  input PostAndImageUpdate {
    postId: String!
    picture: Upload
    name: String
    imageUrl: String
    userImage: String
    title: String
    content: String
  }
  input CreateProfileandImage {
    picture: Upload!
    name: String!
    location: String
    aboutMe: String
    nickName: String
    avatarUrl: String
    createdAt: String
  }
  input UpdateProfileAndImage {
    profileId: String!
    picture: Upload!
    name: String
    location: String
    aboutMe: String
    nickName: String
    avatarUrl: String
  }
  input ProfileInput {
    location: String
    aboutMe: String
    nickName: String
    avatarUrl: String
  }
  input UpdateUser {
    picture: Upload!
    userId: String!
    name: String
    userImage: String
  }

  type Mutation {
    updateUser(input: UpdateUser): User
    createGalleryEntry(input: CreateGalleryEntry!): Post!
    createPostandImage(input: CreatePostandImage): Post!
    editPost(input: PostAndImageUpdate): Post!
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    createPost(postInput: PostInput!): Post!
    publishPost(postId: ID!): Post
    deletePost(postId: ID!): String!
    createComment(postId: ID!, content: String!): Post
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createProfile(profileInput: ProfileInput!): Profile
    createProfileandImage(input: CreateProfileandImage): Profile
    editUserProfile(input: UpdateProfileAndImage): Profile
  }
`
module.exports = typeDefs

import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      role
      token
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      content
      createdAt
      author
      username
      published
      likeCount
      imageUrl
      likes {
        likedBy
        createdAt
      }
      commentCount
      comments {
        content
        username
        createdAt
      }
    }
  }
`
export const FETCH_DRAFTS_QUERY = gql`
  {
    getDraftPosts {
      id
      title
      content
      createdAt
      author
      username
      published
      imageUrl
      likeCount
      likes {
        likedBy
        createdAt
      }
      commentCount
      comments {
        content
        username
        createdAt
      }
    }
  }
`
export const GET_POST_TO_EDIT_BY_ID_QUERY = gql`
  query getPostbyId($postId: ID!) {
    getPostbyId(postId: $postId) {
      id
      title
      content
      createdAt
      author
      username
      published
      likeCount
      imageUrl
      likes {
        likedBy
        createdAt
      }
      commentCount
      comments {
        content
        username
        createdAt
      }
    }
  }
`
export const PUBLISH_POST = gql`
  mutation publishPost($postId: ID!) {
    publishPost(postId: $postId)
  }
`
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
export const UPLOAD_SINGLE_FILE_MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      imageUrl
      filename
    }
  }
`
export const UPLOAD_FILE_MUTATION = gql`
  mutation createNewPost(
    $imageUrl: String!
    $username: String!
    $email: String!
    $author: String!
  ) {
    createNewPost(
      imageUrl: $imageUrl
      username: $username
      email: $email
      author: $author
    ) {
      imageUrl
      username
      email
      author
    }
  }
`

export const ADD_POST_MUTATION = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String!) {
    createPost(
      postInput: { title: $title, content: $content, imageUrl: $imageUrl }
    ) {
      id
      title
      author
      imageUrl
      content
      username
      createdAt
      likes {
        id
        likedBy
        createdAt
      }
    }
  }
`

export const EDIT_POST_MUTATION = gql`
  mutation editPost(
    $postId: ID!
    $title: String!
    $content: String!
    $imageUrl: String!
  ) {
    editPost(
      postUpdateInput: {
        title: $title
        content: $content
        imageUrl: $imageUrl
        postId: $postId
      }
    ) {
      id
      title
      content
      imageUrl
      published
    }
  }
`
export const GET_DRAFTS = gql`
  {
    getDraftPosts {
      id
      title
      content
      imageUrl
      published
    }
  }
`

export const GET_USER_GALLERY = gql`
  {
    getUserImageGallery {
      createdAt
      id
      imageUrl
      imageUserId
      imageUserName
    }
  }
`
export const CREATE_GALLERY_ENTRY = gql`
  mutation CreateGalleryEntry($input: CreateGalleryEntry!) {
    createGalleryEntry(input: $input)
  }
`
export const CREATE_IMAGE_POST = gql`
  mutation CreatePostandImage($input: CreatePostandImage) {
    createPostandImage(input: $input)
  }
`

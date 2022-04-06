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
        username
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
        username
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
        username
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
    publishPost(postId: $postId) {
      id
      published
    }
  }
`
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const EDIT_POST_MUTATION = gql`
  mutation EditPost($input: PostAndImageUpdate) {
    editPost(input: $input) {
      title
      content
      imageUrl
      name
    }
  }
`

export const CREATE_IMAGE_POST = gql`
  mutation CreatePostandImage($input: CreatePostandImage) {
    createPostandImage(input: $input) {
      id
      title
    }
  }
`
export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

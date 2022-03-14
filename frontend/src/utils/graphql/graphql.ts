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
      published
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
export const FETCH_DRAFTS_QUERY = gql`
  {
    getPosts {
      id
      title
      content
      createdAt
      author
      published
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
export const CREATE_POST_MUTATION = gql`
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

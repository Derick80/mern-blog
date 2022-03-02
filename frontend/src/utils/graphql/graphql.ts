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
      likes {
        likedBy
        createdAt
      }
    }
  }
`

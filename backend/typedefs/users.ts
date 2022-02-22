import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }
  type Query {
    getUsers: [User]
  }
`
module.exports = typeDefs

import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client'

import { createUploadLink } from 'apollo-upload-client'

// const httpLink = createHttpLink({
//   uri: 'http://localhost:5045/graphql'
// })
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwtToken') || null
    }
  }))
  return forward(operation)
})
const httpLink = createUploadLink({
  uri: 'http://localhost:5045/graphql'
})
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink])
})

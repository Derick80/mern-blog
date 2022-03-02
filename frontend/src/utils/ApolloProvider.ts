import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
  ApolloLink,
  concat
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:5045/graphql'
})
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwtToken') || null
    }
  }))
  return forward(operation)
  // const token = localStorage.getItem('jwtToken')
  // return {
  //   headers: {
  //     ...headers,
  //     Authorization: token ? `Bearer ${token}` : ''
  //   }
  // }
})

export const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
})

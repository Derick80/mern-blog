const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
import express from 'express'
const { graphqlUploadExpress } = require('graphql-upload')
const dotenv = require('dotenv').config()
const typeDefs = require('../typedefs')
const resolvers = require('../resolvers')
const connectDb = require('../config/db')
const context = require('../middleware/auth-middleware')

import http from 'http'
import { corsMiddleware } from '../middleware/corsMiddleware'

async function startServer(typeDefs: undefined, resolvers: undefined) {
  const port = process.env.PORT

  // Required logic for integrating with Express
  const app = express()

  const httpServer = http.createServer(app)
  app.use(corsMiddleware)
  connectDb()

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: any) => ({ req }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  // More required logic for integrating with Express
  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: true })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  console.log(
    `Server started on port http://localhost:${port}${apolloServer.graphqlPath}`
  )
}

// app.get('/', (req: Request, res: Response) => {
//   return res.send('hello world!')
// })
startServer(typeDefs, resolvers)

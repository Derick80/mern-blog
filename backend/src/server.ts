const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
import express from 'express'
const dotenv = require('dotenv').config()
const {
  GraphQLUpload,
  graphqlUploadExpress // A Koa implementation is also exported.
} = require('graphql-upload')
const typeDefs = require('../schema/typedefs')
const resolvers = require('../schema/resolvers')
const connectDb = require('../config/utils/db')

import http from 'http'
import { corsMiddleware } from '../middleware/corsMiddleware'

async function startServer(typeDefs: undefined, resolvers: undefined) {
  const port = process.env.PORT

  // Required logic for integrating with Express
  const app = express()

  const httpServer = http.createServer(app)
  app.use(corsMiddleware)
  app.use(graphqlUploadExpress())
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

startServer(typeDefs, resolvers)

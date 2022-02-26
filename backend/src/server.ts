const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
import express from 'express'
const dotenv = require('dotenv').config()
const typeDefs = require('../typedefs')
const resolvers = require('../resolvers')
const connectDb = require('../config/db')
import http from 'http'

async function startServer(typeDefs: undefined, resolvers: undefined) {
  const port = process.env.PORT

  const app = express()

  connectDb()

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

  const httpServer = http.createServer(app)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  console.log(
    `Server started on port http://localhost:${port}${apolloServer.graphqlPath}`
  )
}

// app.get('/', (req: Request, res: Response) => {
//   return res.send('hello world!')
// })
startServer(typeDefs, resolvers)

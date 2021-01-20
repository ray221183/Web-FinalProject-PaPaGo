import { GraphQLServer, PubSub } from 'graphql-yoga'
// import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
//import Subscription from './resolvers/Subscription'
// import User from './resolvers/User'
// import Post from './resolvers/Post'
// import Comment from './resolvers/Comment'
require('dotenv').config()
const mongoose = require('mongoose')
if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect('mongodb+srv://PaPaGo:papago123456@cluster0.4ksx8.mongodb.net/cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
     Query,
     Mutation,
     //Subscription
  },
  context: {
    db,
    pubsub
  }
})

server.start({ port: process.env.PORT | 4000}, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})

//const { loadFile } = require('graphql-import-files')
import { USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT} from './src/graphql/index.js'
import {importSchema} from'graphql-import'
import {ApolloServer, gql } from 'apollo-server-express';
import express from 'express'
const app = express()
console.log("qaq")
const typeDefs = importSchema('./server/schema.graphql')
console.log("qaq2")
const server = new ApolloServer({ typeDefs, resolvers:{ USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT} });
server.applyMiddleware({ app });
app.listen({ port: 80})
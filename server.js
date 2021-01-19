import Query from './server/resolvers/Query'
import Mutation from './server/resolvers/Mutation'
const {importSchema} = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server-express');
const app = require('express')();
const typeDefs = importSchema('./server/schema.graphql')
const resolvers = {Query,Mutaion}
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen({ port: 80})
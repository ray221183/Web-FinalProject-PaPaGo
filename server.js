//const { loadFile } = require('graphql-import-files')
const {importSchema} = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server-express');
const app = require('express')();
const typeDefs = importSchema('./server/schema.graphql')
const resolvers = require('./src/graphql/index.')
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen({ port: 80})
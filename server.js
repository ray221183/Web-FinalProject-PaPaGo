//const { loadFile } = require('graphql-import-files')
const{ USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT} = require('./src/graphql')
const {importSchema} = require('graphql-import')
const {ApolloServer, gql } =require('apollo-server-express');
const express = require('express')
const GMR = require('graphql-merge-resolvers')
const { mergeTypeDefs } = require('@graphql-tools/merge');
const Query = require('./server/resolvers/Query.js')
const Mutation = require('./server/resolvers/Mutation.js')
const app = express()
console.log("qaq")
const typeDefs= mergeTypeDefs([USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT
]);
const resolvers = GMR.merge([Query,Mutation])
console.log(typeDefs)
console.log('qqqqqqqqqqqqq')
console.log(resolvers)
console.log("qaq3")
const server = new ApolloServer({ typeDefs, resolvers});
console.log("qaq2")
server.applyMiddleware({ app });
app.listen({ port: 80})
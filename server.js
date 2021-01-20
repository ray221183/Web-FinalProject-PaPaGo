//const { loadFile } = require('graphql-import-files')
const { readFileSync } = require('fs');
const path = require('path');
//const {importSchema} = require('graphql-import')
const { ApolloServer } = require('apollo-server-express');
const express = require('express')
//const GMR = require('graphql-merge-resolvers')
//const { mergeTypeDefs } = require('@graphql-tools/merge');
const Query = require('./server/resolvers/Query')
const Mutation = require('./server/resolvers/Mutation')
//const { makeExecutableSchema } = require('graphql-tools');
PORT = process.env.PORT || 80
//const Mutation = require('./server/resolvers/Mutation.js')
const app = express()
const server = new ApolloServer({ typeDefs:readFileSync('./server/schema.graphql','utf-8'), resolvers:{
	Query,
	Mutation
} });

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


server.applyMiddleware({ app });
app.listen({ port: PORT }, () =>
  console.log("ready")
);
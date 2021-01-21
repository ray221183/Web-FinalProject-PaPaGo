const { readFileSync } = require('fs');
const bodyParser = require('body-parser')
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const express = require('express')
const Query = require('./server/resolvers/Query')
const Mutation = require('./server/resolvers/Mutation')
const PORT = process.env.PORT || 80
const app = express()
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
const server = new ApolloServer({ typeDefs:readFileSync('./server/schema.graphql','utf-8'), resolvers:{
	Query,
	Mutation
	},
  context:({req, res})=>({req,res}) 
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


server.applyMiddleware({ app });
app.listen({ port: PORT }, () =>
  console.log("ready")
);
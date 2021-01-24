const bodyParser = require('body-parser')
const { readFileSync } = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const express = require('express')
import { json } from 'express';
const Query = require('./server/resolvers/Query')
const Mutation = require('./server/resolvers/Mutation')
const PORT = process.env.PORT || 80
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://PaPaGo:papago123456@cluster0.4ksx8.mongodb.net/cluster0?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => {
  console.error(error)
})


app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
const server = new ApolloServer({ typeDefs:readFileSync('./server/schema.graphql','utf-8'), resolvers:{
	Query,
	Mutation
	},
  //context:({req, res})=>({req,res}) 
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(json({ limit: '10mb' });
server.applyMiddleware({ app });
db.once('open', () => {
  console.log('MongoDB connected!')
  app.listen({ port: PORT }, () =>
    console.log("ready")
  );
})
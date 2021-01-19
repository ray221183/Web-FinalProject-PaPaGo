//import { graphqlExpress } from 'apollo-server-express';
const graphqlExpress = require('apollo-server-express')
const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
const bodyParser = require('body-parser')
const myGraphQLSchema = loadSchema('server/schema.graphql',{  // load from a single schema file
    loaders: [
        new GraphQLFileLoader()
    ]
})// ... define or import your schema here!



// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
console.log("apollo start")
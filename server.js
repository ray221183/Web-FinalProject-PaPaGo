//import { graphqlExpress } from 'apollo-server-express';
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const {importSchema} = require('graphql-import')
const schema = importSchema('./server/schema.graphql')// ... define or import your schema here!
const app = express();
port = 80

// bodyParser is needed just for POST.
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(80, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
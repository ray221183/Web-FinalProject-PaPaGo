//const { loadFile } = require('graphql-import-files')
const {USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT} = require('./src/graphql/index')
const {importSchema} = require('graphql-import')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const express = require('express')
const GMR = require('graphql-merge-resolvers')
const { mergeTypeDefs } = require('@graphql-tools/merge');
const {Query} = require('./server/resolvers/Query')
const {Mutation} = require('./server/resolvers/Mutation')
const { makeExecutableSchema } = require('graphql-tools');
port = 3000
//const Mutation = require('./server/resolvers/Mutation.js')
const app = express()
console.log(USER_QUERY)
console.log("qaq")
const typeDefs= mergeTypeDefs([USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,
ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT
]);
const resolvers = GMR.merge([Query,Mutation])
console.log(typeDefs)
console.log('qqqqqqqqqqqqq')
console.log(resolvers)
console.log("qaq3")
const schema = makeExecutableSchema({
  ,
  resolvers
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(port, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
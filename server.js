import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
const myGraphQLSchema = loadSchema('server/schema.graphql',{  // load from a single schema file
    loaders: [
        new GraphQLFileLoader()
    ]
})// ... define or import your schema here!
const PORT = 80;

const app = express();

// bodyParser is needed just for POST.
app.use('src/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
console.log("apollo start")
app.listen(PORT);
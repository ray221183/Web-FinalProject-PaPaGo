import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'

import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker'
import {
	BrowserRouter as Router,
  } from "react-router-dom";
console.log("hi")
// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://papagoisme.herokuapp.com:4000/'
})
// Create a WebSocket link:
/*const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: { reconnect: true }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
*/
// const link = httpLink

const client = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache().restore({})
})

const wrappedApp = (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(wrappedApp, document.getElementById('root'))
serviceWorker.unregister()

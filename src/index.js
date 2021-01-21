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

// Create an http link:
const httpLink = new HttpLink({
})

// Create a WebSocket link:

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent

const client = new ApolloClient({
  httpLink,
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

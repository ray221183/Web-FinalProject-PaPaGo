const { USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY } = require('./queries.js')
const { ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT } =  require('./mutations.js')
//export {} from './subscriptions.js'
module.exports = {USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY, MULTIPOST_QUERY,ADD_USER, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_GREAT  }


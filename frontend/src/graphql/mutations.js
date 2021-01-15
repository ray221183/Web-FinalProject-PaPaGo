import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser(
	$first_name: String!
	$last_name: String!
	$account: String!
	$password: String!
  ) {
	addUser(
	  data: {
		first_name: $first_name
		last_name: $last_name
		account: $account
		password: $password
	  }
	) 
  }
`





export {ADD_USER}

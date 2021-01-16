import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser(
	$name: String!
	$account: String!
	$password: String!
  ) {
	addUser(
	  data: {
		name:$name
		account: $account
		password: $password
	  }
	) 
  }
`
const ADD_POST = gql`
mutation addPost(
	$content: String!
	$writer: String!
	$tags: [String]!
	$date: String!
	$is_sketch: Boolean!
  ) {
	addPost(
	  data: {
		content: $content
		writer: $writer
		tags: $tags
		is_sketch: $is_sketch
	  }
	) 
  }
`

const DELETE_POST = gql`
mutation deletePost(
	$uuid:String!
  ) {
	deletePost(
	  data: {
		  uuid:$uuid
	  }
	) 
  }
`

const UPDATE_POST = gql`
mutation updatePost(
	$uuid:String!
	$content:String!
	$tags:[String]!
	$date:String!
	$is_sketch:String!
  ) {
	updatePost(
	  data: {
		  uuid:$uuid
		  content:$content
		  tags:$tags
		  date:$date
		  is_sketch:$is_sketch
	  }
	) {
		content
		name
		tags
		date
		writer
		is_sketch
		uuid
	}
  }
`



export {ADD_USER, ADD_POST,DELETE_POST, UPDATE_POST}

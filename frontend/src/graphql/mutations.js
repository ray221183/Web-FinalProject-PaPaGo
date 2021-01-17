import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser(
	$first_name: String!
	$last_name: String!
	$name: String!
	$account: String!
	$password: String!
  ) {
	addUser(
	  data: {
		first_name:$first_name
		last_name:$last_name
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
		date: $date
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
	$is_sketch:Boolean! 
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

const UPDATE_GREAT = gql`
mutation updateGreat(
	$uuid:String!
	$account:String!
	$is_push:Boolean!
  ) {
	updateGreat(
	  data: {
		uuid:$uuid
		account:$account
		is_push:$is_push
	  }
	) 
  }
`



export {ADD_USER, ADD_POST,DELETE_POST, UPDATE_POST, UPDATE_GREAT}

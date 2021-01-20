const {gql} =require('apollo-boost')

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
	$title: String!
	$introduction: String!
	$content: String!
	$writer: String!
	$tags: [String]!
	$date: String!
	$is_sketch: Boolean!
	$related_uuid: String
  ) {
	addPost(
	  data: {
		title: $title
		introduction: $introduction
		content: $content
		writer: $writer
		tags: $tags
		date: $date
		is_sketch: $is_sketch
		related_uuid: $related_uuid
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
	$title: String!
	$introduction: String!
	$uuid:String!
	$content:String!
	$tags:[String]!
	$date:String!
	$is_sketch:Boolean! 
  ) {
	updatePost(
	  data: {
		  title: $title
		  introduction:$introduction
		  uuid:$uuid
		  content:$content
		  tags:$tags
		  date:$date
		  is_sketch:$is_sketch
	  }
	) {
		title
		introduction
		content
		name
		tags
		date
		writer
		is_sketch
		uuid
		related_uuid
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



module.exports =  {ADD_USER, ADD_POST,DELETE_POST, UPDATE_POST, UPDATE_GREAT}

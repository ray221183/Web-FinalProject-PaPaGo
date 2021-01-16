import { gql } from 'apollo-boost'

const USER_QUERY = gql`
  query user(
    $account: String!
    $password: String!
  ) {
    user(
      data: {account: $account, password: $password}
    ) {
      name
      account
      password
      valid
    }
  }
`

const POST_QUERY = gql`
query post(
	$writer: String!
	$reader: String!
	$get_sketch: Boolean!
	$get_non_sketch: Boolean!
  $keyword:    String! 
  $uuid:     String
) {
  post(
    data: {
      writer:$writer
      reader:$reader
      get_sketch:$get_sketch
      get_non_sketch:$get_non_sketch
      keyword:$keyword
      uuid:$uuid
    }
  ) {
    posts{
      content
      name
      tags
      date
      writer
      is_sketch
      uuid
    }
  }
}
`
export {USER_QUERY, POST_QUERY}

import { gql } from 'apollo-boost'

const USER_QUERY = gql`
  query user(
    $account: String!
    $password: String!
  ) {
    user(
      data: {account: $account, password: $password}
    ) {
      first_name
      last_name
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
    $search_type: String!
    $get_sketch: Boolean!
    $get_non_sketch: Boolean!
    $keyword:    String! 
    $uuid:     String
  ) {
    post(
      data: {
        writer:$writer
        search_type:$search_type
        get_sketch:$get_sketch
        get_non_sketch:$get_non_sketch
        keyword:$keyword
        uuid:$uuid
      }
    ) {
      posts{
        title
        introduction
        content
        name
        tags
        date
        writer
        is_sketch
        uuid
        great_num
        related_uuid
      }
    }
  }
`

const GREATOFPOST_QUERY = gql`
query greatOfpost(
  $uuid: String!
) {
  greatOfpost(
    data: {
      uuid:$uuid
    }
  ) {
    users{
      account
      name
    }
  }
}
`
const GREATOFUSER_QUERY = gql`
query greatOfpost(
  $account: String!
) {
  greatOfuser(
    data: {
      account:$account
    }
  ) {
    posts{
      content
      name
      writer
      tags
      date
      uuid
      great_num
    }
  }
}
`
export {USER_QUERY, POST_QUERY, GREATOFPOST_QUERY, GREATOFUSER_QUERY}

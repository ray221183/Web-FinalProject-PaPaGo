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
      account
      password
      valid
    }
  }
`

export {USER_QUERY}

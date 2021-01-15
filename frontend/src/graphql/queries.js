import { gql } from 'apollo-boost'

const USER_QUERY = gql`
  query {
    user {
      first_name
      last_name
      account
      password
      valid
    }
  }
`

export {USER_QUERY}

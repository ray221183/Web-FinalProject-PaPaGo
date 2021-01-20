const { gql } =require('apollo-boost')

const POSTS_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        title
        body
        author {
          name
        }
        published
      }
    }
  }
`

module.exports = {POSTS_SUBSCRIPTION}

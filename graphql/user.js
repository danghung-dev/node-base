const { gql } = require('apollo-server-express')

const UserTypedef = gql`
  "This is User type"
  type User {
    id: Int!
    firstName: String
    lastName: String
  }

  extend type Query {
    users: [User],
  }
`

const UserResolvers = {
  Query: {
    users: async (_source, _args, { dataSources }) => dataSources.userAPI.getUserList(),
  },
}
module.exports = { UserTypedef, UserResolvers }

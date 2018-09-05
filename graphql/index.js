const { makeExecutableSchema } = require('graphql-tools')
const User = require('./User/queries')
const Order = require('./Order/queries')

const RootQuery = `
  type RootQuery {
    user(id: Int!): Post
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [User, Order],
  resolvers: {},
})

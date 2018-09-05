
const BaseTypedef = `
  type Query {
    hello: String
  }
  type Mutation {
    hello(id: Int!): String
  }
`

const BaseResolvers = {
  Query: {
    hello: () => 'Hello world',
  },
  Mutation: {
    hello: (_, { id }) => `Hello world id: ${id}`,
  },
}
module.exports = { BaseTypedef, BaseResolvers }

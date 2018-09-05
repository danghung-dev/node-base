
const BaseTypedef = `
  type Query {
    hello: String
  }
  type Mutation {
    hello: String
  }
`

const BaseResolvers = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    hello: _ => 'hello world',
  },
}
module.exports = { BaseTypedef, BaseResolvers }

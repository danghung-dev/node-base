const Order = require('../Order/queries')

const User = `
  type User {
    id: Int!
    message: String
    author: String
    orders: [Order]
  }
`
module.exports = () => [User, Order]

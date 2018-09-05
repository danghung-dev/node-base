const { find, filter } = require('lodash')
const { posts } = require('./mockdata')
const { authors } = require('./mockdata')
// const Post = require('../Post/queries')

const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }
  extend type Query {
    author(id: Int!): Author
  }
`

const authorResolvers = {
  Query: {
    author: (_, { id }) => find(authors, { id }),
  },
  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },
}
module.exports = { Author, authorResolvers }

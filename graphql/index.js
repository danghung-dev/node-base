// const Post = require('./Post/queries')
// const Author = require('./Author/queries')
// const RootQuery = require('./rootQuery')
// const SchemaDefinition = require('./schema')

// // example data
// const authors = [
//   { id: 1, firstName: 'Tom', lastName: 'Coleman' },
//   { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
//   { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
// ]

// const posts = [
//   {
//     id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2,
//   },
//   {
//     id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3,
//   },
//   {
//     id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1,
//   },
//   {
//     id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7,
//   },
// ]

// const resolvers = {
//   Query: {
//     posts: (_, { id }) => find(posts, { id }),
//     author: (_, { id }) => find(authors, { id }),
//   },

//   // Mutation: {
//   //   upvotePost: (_, { postId }) => {
//   //     const post = find(posts, { id: postId })
//   //     if (!post) {
//   //       throw new Error(`Couldn't find post with id ${postId}`)
//   //     }
//   //     post.votes += 1
//   //     return post
//   //   },
//   // },

//   Author: {
//     posts: author => filter(posts, { authorId: author.id }),
//   },

//   Post: {
//     author: post => find(authors, { id: post.authorId }),
//   },
// }

// const {
//   typeDef as Author,
//   resolvers as authorResolvers,
// } = require('./Author/queries')
const { Author, authorResolvers } = require('./Author/queries')
const { PostTypeDef, PostResolvers } = require('./Post/queries')
const { BaseTypedef, BaseResolvers } = require('./base')

const { find, filter, merge } = require('lodash')
const { makeExecutableSchema } = require('graphql-tools')

const resolvers = {}
module.exports = makeExecutableSchema({
  typeDefs: [Author, PostTypeDef, BaseTypedef],
  resolvers: merge(resolvers, authorResolvers, PostResolvers, BaseResolvers),
})

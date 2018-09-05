// Post.js
const { find } = require('lodash')
const { gql } = require('apollo-server-express')
const { posts } = require('./mockdata')
const { authors } = require('./mockdata')

const PostTypeDef = gql`
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  extend type Query {
    posts(id: Int!): Post
  }
  # this schema allows the following mutation:
  extend type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`
const PostResolvers = {
  Query: {
    posts: (_, { id }) => find(posts, { id }),
  },
  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId })
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`)
      }
      post.votes += 1
      return post
    },
  },
}

module.exports = { PostTypeDef, PostResolvers }

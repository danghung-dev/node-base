const express = require('express')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const httpStatus = require('http-status')
const helmet = require('helmet')
const indexRoute = require('../api')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const ApiError = require('./ApiError')
const logger = require('./logger')

const VERSION = '/v1'

const { ApolloServer, gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}
const schema = require('../graphql')

// const server = new ApolloServer({
//   // These will be defined for both new or existing servers
//   typeDefs,
//   resolvers,
// })

const server = new ApolloServer({ schema })

const app = express()
const graphQLPath = `${VERSION}/graphql`
const jwtCheck = (req, res, next) => {
  // res.status(401).json({ ok: 1 })
  next()
}
app.use(graphQLPath, jwtCheck)
server.applyMiddleware({ app, graphQLPath })

if (config.env === 'development') {
  app.use(morgan('dev'))
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compression())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount all routes on /api path
app.use(VERSION, indexRoute)

// if error is not an instanceOf ApiError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const apiError = new ApiError(err.message, err.status)
    return next(apiError)
  }
  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new ApiError('API not found', httpStatus.NOT_FOUND)
  return next(err)
})
// // log error in winston transports except when executing test suite
// if (config.env !== 'test') {
//   app.use(
//     expressWinston.errorLogger({
//       winstonInstance
//     })
//   )
// }
// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  logger.info({
    req: {
      body: req.body,
      query: req.query,
      baseurl: req.baseUrl,
      originalUrl: req.originalUrl,
    },
    debugError: {
      message: err.message,
      status: err.status,
      stack: err.stack,
    },
  })
  res.status(err.status).json({
    message: err.message,
    stack: config.env === 'development' ? err.stack : {},
  })
})
module.exports = app

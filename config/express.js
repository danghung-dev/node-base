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
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
// const schema = require('../libraries/graphql/schema')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'Hello world!' }

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
// app.use('/graphql', bodyParser.json(), (req, res, next) =>
//   graphqlExpress({
//     schema,
//     // context: { user: req.user },
//   })(req, res, next))
// // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// app.use('/graphiql', (req, res, next) =>
//   graphiqlExpress({ endpointURL: '/graphql' })(req, res, next))


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
app.use('/v1', indexRoute)

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

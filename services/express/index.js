const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const log = require('../logger')
const { ApiError } = require('../error')
const app = express()

if (config.env === 'development') {
  app.use(logger('dev'))
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount all routes on /api path
app.use('/api', routes)

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join('. '))
      .join(' and ')
    const error = new APIError(unifiedErrorMessage, err.status, true)
    return next(error)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND)
  return next(err)
})
// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  )
}
// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
  res.status(err.status).json({
    message: err.message,
    stack: config.env === 'development' ? err.stack : {}
  })
)

const httpStatus = require('http-status')

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    this.isOperational = true // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name)
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status)
  }
}

module.exports = ApiError

const Joi = require('joi')
const ApiError = require('../config/ApiError')

module.exports = (schema, type = 'query') => ({ query, body }, res, next) => {
  const data = type === 'query' ? query : body
  const result = Joi.validate(data, schema)
  if (result.error) {
    // TODO: need to loop and get only message
    return next(new ApiError(result.error.details, 400))
  }
  return next()
}

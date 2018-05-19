const httpStatus = require('http-status')
const ApiError = require('../../config/ApiError')
const Response = require('../../config/response')
const Products = require('./products.model')

const list = (req, res) => {
  const data = 'list'
  return Response.success(res, data)
}

const create = async (req, res, next) => {
  try {
    const { body } = req
    const data = { name: body.name }
    await Products.create(data)
    return Response.success(res, data, httpStatus.CREATED)
  } catch (err) {
    return next(new ApiError(err))
  }
}
module.exports = { list, create }

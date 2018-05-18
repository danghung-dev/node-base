const httpStatus = require('http-status')
const ApiError = require('../../config/ApiError')
const Response = require('../../config/response')
const Users = require('./users.model')

const list = (req, res) => {
  const data = 'list'
  return Response.success(res, data)
}

const create = async (req, res, next) => {
  const { body } = req
  const data = { username: body.username, password: body.password }
  await Users.create(data)
  return Response.success(res, data)
}
module.exports = { list, create }

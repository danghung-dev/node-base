const httpStatus = require('http-status')
const ApiError = require('../../config/ApiError')
const Response = require('../../config/response')
const logger = require('../../config/logger')
const {
  Users, sequelize, Sequelize,
} = require('../../models')

const list = (req, res) => {
  const data = 'list'
  logger.info({ req, res: data })
  return Response.success(res, data)
}

const create = async (req, res, next) => {
  try {
    const { body } = req
    const data = { username: body.username, password: body.password }
    await Users.create(data)
    // const a = req.query.a.b
    return Response.success(res, data, httpStatus.CREATED)
  } catch (err) {
    return next(err)
  }
}
module.exports = { list, create }

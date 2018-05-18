const httpStatus = require('http-status')

const success = (res, data, code) => {
  res.status(code || httpStatus.OK).json({ data })
}
const error = (res, data, code) => {
  res.status(code || httpStatus.INTERNAL_SERVER_ERROR).json({ data })
}
module.exports = { success, error }

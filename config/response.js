const httpStatus = require('http-status')
success = (res, data, code) => {
  res.status(code || httpStatus.OK).json({ data })
}
error = (res, data, code) => {
  res.status(code || httpStatus.INTERNAL_SERVER_ERROR).json({ data })
}
module.exports = { success, error }

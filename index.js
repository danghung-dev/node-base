const config = require('./config/config')
const app = require('./config/express')
const logger = require('./config/logger')

app.listen(config.port, () => {
  logger.info(`Started on port ${config.port}`)
})

module.exports = app

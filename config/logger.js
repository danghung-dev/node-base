const winston = require('winston')
// const moment = require('moment')

// const options = {
//   file: {
//     level: 'info',
//     filename: process.env.LOG_PATH || `${__dirname}/logs/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//   },
//   console: {
//     level: 'debug',
//     // format: developmentFormat,
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// }

// var config = {
//   host: 'localhost',
//   port: 24224,
//   timeout: 3.0,
//   requireAckResponse: true // Add this option to wait response from Fluentd certainly
// }
// var fluentTransport = require('fluent-logger').support.winstonTransport()
const logger = new winston.Logger({
  transports: [
    // new fluentTransport('fluentd', config),
    new winston.transports.Console(),
  ],
})

// logger.on('logging', (transport, level, message, meta) => {
//   if (meta.end && transport.sender && transport.sender.end) {
//     transport.sender.end()
//   }
// })

module.exports = logger

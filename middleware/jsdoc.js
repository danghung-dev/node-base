const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const options = {
  swaggerDefinition: {
    info: {
      title: ' service', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: [
    path.join(__dirname, '../api/*/*.route.js'),
    path.join(__dirname, '../../models/*.js'),
  ], // Path to the API docs
}
const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec

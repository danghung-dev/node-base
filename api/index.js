const { Router } = require('express')
const userRoute = require('./users/users.route')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../middleware/jsdoc')

const router = new Router()
router.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

router.use('/users', userRoute)

router.get('/', (req, res) => {
  res.send('Root of api service')
})

module.exports = router

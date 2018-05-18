const { Router } = require('express')
const userRoute = require('./users/users.route')

const router = new Router()

router.use('/users', userRoute)

router.get('/', (req, res) => {
  res.send('Root of api service')
})

module.exports = router

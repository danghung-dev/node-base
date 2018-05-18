const express = require('express')
const usersCtl = require('./users.controller')
const Joi = require('joi')
const { validate } = require('../../middleware')

const router = express.Router()
const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
})
router.route('/').get(usersCtl.list)
router.route('/').post(validate(userSchema, 'body'), usersCtl.create)

module.exports = router

const express = require('express')
const productsCtl = require('./products.controller')
const Joi = require('joi')
const { validate } = require('../../middleware')

const router = express.Router()
const userSchema = Joi.object().keys({
  name: Joi.string().required(),
})
router.route('/').get(productsCtl.list)
router.route('/').post(validate(userSchema, 'body'), productsCtl.create)

module.exports = router

const express = require('express')
const usersCtl = require('./users.controller')
const Joi = require('joi')
const { validate } = require('../../middleware')

const router = express.Router()
const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - User
 *    description: Get list of users
 *    summary: Get list of user
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *    responses:
 *      '200':
 *        description: Successfully
 *        content:
 *          application/json:
 *        example:
 *          data:
 *            - id: "123"
 *  */
router.route('/').get(usersCtl.list)

/**
  * @swagger
 * /users:
 *  post:
 *    tags:
 *      - User
 *    description: Create User
 *    summary: Create User
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: User
 *        schema:
 *          type: object
 *          require:
 *            - user
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *          example:
 *            username: "abc"
 *            password: "123"
 *            reservedContainers:
 *              - contId: SUDU307007-6
 *                needCarrierConfirm: true
 *    responses:
 *      '200':
 *        description: Successfully
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *        example:
 *          data:
 *            id: "56cb2442-d174-4091-b85d-73f41acefc39"
 */
router.route('/').post(validate(userSchema, 'body'), usersCtl.create)

module.exports = router

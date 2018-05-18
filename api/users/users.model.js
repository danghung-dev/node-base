// const Sequelize = require('sequelize')
const { sequelize } = require('../../config/models')

const Users = sequelize.import('users', (sequelize2, DataTypes) =>
  sequelize2.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }))

Users.sync()

module.exports = Users

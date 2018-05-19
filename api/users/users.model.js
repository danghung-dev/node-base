const { sequelize } = require('../../config/sequelize')

const Users = sequelize.import(
  'users',
  (sequelize2, DataTypes) => {
    const users = sequelize2.define('users', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    })
    users.associate = (models) => {
      // associations can be defined here
      users.hasMany(models.orders, { foreignKey: 'userId', as: 'orders' })
    }
    return users
  },
  {},
)
Users.sync()
module.exports = Users

const { sequelize } = require('../../config/sequelize')

const Products = sequelize.import('orders', (sequelize2, DataTypes) => {
  const orders = sequelize2.define(
    'orders',
    {
      amount: DataTypes.INTEGER,
      coupon: DataTypes.STRING,
    },
    {},
  )
  orders.associate = (models) => {
    // associations can be defined here
    // orders.belongsTo(models.users, { foreignKey: 'countryCode', targetKey: 'isoCode' })
    orders.belongsToMany(models.products, { through: 'product_order', as: 'products' })
  }
  return orders
})

module.exports = Products

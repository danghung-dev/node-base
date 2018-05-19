const { sequelize } = require('../../config/sequelize')

const Products = sequelize.import('products', (sequelize2, DataTypes) => {
  const products = sequelize2.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {},
  )
  products.associate = (models) => {
    // associations can be defined here
    products.belongsToMany(models.orders, { through: 'product_order', as: 'orders' })
  }
  return products
})

module.exports = Products

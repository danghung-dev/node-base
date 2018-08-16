
module.exports = (sequelize2, DataTypes) => {
  const products = sequelize2.define(
    'Product',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {},
  )
  products.associate = (models) => {
    // associations can be defined here
    products.belongsToMany(models.Order, { through: 'Product_Order', as: 'orders' })
  }
  return products
}


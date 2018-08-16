
module.exports = (sequelize2, DataTypes) => {
  const orders = sequelize2.define(
    'Order',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
        },
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      coupon: {
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
  orders.associate = (models) => {
    // associations can be defined here
    // orders.belongsTo(models.users, { foreignKey: 'countryCode', targetKey: 'isoCode' })
    orders.belongsToMany(models.Product, { through: 'Product_Order', as: 'products' })
  }
  return orders
}

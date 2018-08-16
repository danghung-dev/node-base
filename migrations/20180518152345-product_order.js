module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Product_Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.STRING,
        references: {
          model: 'Product',
          key: 'id',
        },
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Order',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Product_Order')
  },
}

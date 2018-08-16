module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('User', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'password')
    await queryInterface.removeColumn('User', 'username')
  },
}

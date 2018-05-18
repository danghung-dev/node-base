module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn('users', 'password', Sequelize.STRING, { transaction: t }),
        queryInterface.addColumn('users', 'resetPasswordToken', Sequelize.STRING, {
          transaction: t,
        }),
        queryInterface.addColumn('users', 'resetPasswordExpires', Sequelize.DATE, {
          transaction: t,
        }),
      ])), /*      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  down: async (queryInterface, Sequelize) =>
    [
      await queryInterface.removeColumn('users', 'facebook_id'),
      await queryInterface.removeColumn('users', 'twitter_id'),
      await queryInterface.removeColumn('users', 'gender'),
    ]
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  ,
}

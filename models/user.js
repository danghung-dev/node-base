
module.exports = (sequelize2, DataTypes) => {
  const users = sequelize2.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
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
  })
  users.associate = (models) => {
    // associations can be defined here
    users.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' })
  }
  return users
}

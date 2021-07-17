const formatTime = require('../utils/moments')
const crypto = require('../utils/crypto')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    nickname: {
      type: DataTypes.STRING(16),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
          isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      set(password) { return this.setDataValue('password', crypto(password)) }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,

      get() {return formatTime(this) }
    }
  })

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'nickname', sourceKey: 'nickname'})
    User.hasMany(models.Comment, { foreignKey: 'nickname', sourceKey: 'nickname'})
  }

  return User

}
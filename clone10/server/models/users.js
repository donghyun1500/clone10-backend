import { formatTime } from '../utils/moments.js'
import { crypto } from '../utils/crypto.js'


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickname: {
      type: DataTypes.STRING,
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
    realName: {
      type: DataTypes.STRING,
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
    },
    image: {
      type: DataTypes.STRING,
    }
  })

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'nickname', sourceKey: 'nickname'})
    User.hasMany(models.Comment, { foreignKey: 'nickname', sourceKey: 'nickname'})
  }

  return User

}
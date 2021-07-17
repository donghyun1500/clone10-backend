const formatTime= require("../utils/moment")

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('posts', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.BLOB("long"),
            defaultValue: null,
        },
        like: {
            type: DataTypes.BLOB("long"),
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,

            get() { return formatTime(this)}
        }
    })

    Post.associate = models => {
        Post.belongsTo(models.User, { foreignKey: 'nickname', targetKey: 'nickname'})
        Post.hasMany(models.Comment, { foreignKey: 'postId', sourceKey: 'postId'})
    }

    return Post
}
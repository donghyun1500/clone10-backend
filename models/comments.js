const formatTime = require('../utils/moments')

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comments', {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,

            get() { return formatTime(this) }
        }
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: 'nickname', targetKey: 'nickname'})
        Comment.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'postId'})
    }

    return Comment
    
}
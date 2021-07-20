import { formatTime } from '../utils/moments'

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            get() { return formatTime(this) }
        }
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: 'nickname', targetKey: 'nickname'})
        Comment.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'postId'})
    }

    return Comment
    
}
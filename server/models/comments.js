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
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    return Comment
    
}
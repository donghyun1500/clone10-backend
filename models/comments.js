module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

            get() { return formatTime(this) }
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    return Comment
}
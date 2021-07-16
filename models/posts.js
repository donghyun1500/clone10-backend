module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.BLOB("long")
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

    return Post
}
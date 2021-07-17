const Sequelize = require('sequelize');
const config = require('../config/config.json');
const User = require('./users');
const Post = require('./posts');
const Comment = require('./comments');

const sequelize = new Sequelize(config);
const dataTypes = Sequelize.DataTypes;

const db = {}

db.sequelize = sequelize;
db.User = User(sequelize, dataTypes);
db.Post = Post(sequelize, dataTypes);
db.Comment = Comment(sequelize, dataTypes);

module.exports = db
import SQ from 'Sequelize';
import config from '../config/config.json';
import {User} from './users.js'
import {Post} from './posts.js';
import {Comment} from './comments.js';

const SQ = new SQ(config);
const dataTypes = SQ.DataTypes;

const db = {}

db.SQ = SQ;
db.User = User(SQ, dataTypes);
db.Post = Post(SQ, dataTypes);
db.Comment = Comment(SQ, dataTypes);

db.User.associate(db);
db.Post.associate(db);
db.Comment.associate(db);

module.exports = db
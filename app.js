const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const router = express.Router();
const commentsRouter = require("./routers/comments");
const postssRouter = require("./routers/posts");
const userssRouter = require("./routers/users");
const authMiddleware = require("./middlewares/auth-middleware");

const app = express();
const port = 3000;

app.use(cors({ credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Sequelize Connected
sequelize.sync({ force: false })   //동기화를 강제 하지 말것!
    .then(() => console.log("Connected to MySQL"))
    .catch(err => console.error(err))


// routers
app.use('/posts', postssRouter)
app.use('posts/:postId/comments', commentsRouter)
app.use('/', userssRouter)


app.listen(port, () => console.log("Server is running on port",port))
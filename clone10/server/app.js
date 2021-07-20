import express from 'express';
import { sequelize } from "./models/index.js";
import cors from"cors";
import loginRouter from "./routers/login.js";
import userssRouter from "./routers/users.js";
import postssRouter from "./routers/posts.js";
import commentsRouter from "./routers/comments.js";

const app = express();
const port = 3000;

// Middlewares
app.use(cors({ credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//  Sequelize Connected
sequelize.sync({ force: false })   //동기화를 강제 하지 말것!
    .then(() => console.log("Connected to MySQL"))
    .catch(err => console.error(err))


// routers
app.use('/posts', postssRouter)
app.use('posts/:postId/comments', commentsRouter)
app.use('/users', userssRouter)
app.use('/login', loginRouter)

// Error handler
app.use((err, _, res, __) => {
    console.error(err)
    res.send(err || 'Unknown Error...Happy Coding!')
})

//port 3000
app.listen(port, () => console.log("Server is running on port",port))
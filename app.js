const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const { User } = require("./models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/auth-middleware")

const app = express();
const router = express.Router();
const port = 3000;

app.use(cors({ credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Sequelize Connected
sequelize.sync({ force: false })   //동기화를 강제 하지 말것!
    .then(() => console.log("Connected to MySQL"))
    .catch(err => console.error(err))

router.post("/users", async (req,res) => {
    const { nickname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 일치하지 않습니다.",
        });
        return;
    }

    const existUsers = await User.findAll({
        where: {
            [Op.or]: [{ nickname}, { email }],
        },
    });
    if (existUsers) {
        res.status(400).send({
            errorMessage: "이미 가입된 이메일이나 닉네임이 있습니다.",
        });
        return;
    }

    const user = await User.create({ email, nickname, password });

    res.status(201).send(user);
});

router.post("/login", async (res, req) => {
    const { email, password, name } = req.body;

    const user = await User.findOne({ where: {email, password, name} });

    if(!user) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 일치하지 않습니다.",
        });
        return;
    }

    const token = jwt.sign({ nickname: user.nickname }, "my-secret-key");
    res.send({ 
        token,
        user
    });
});





app.listen(port, () => console.log("Server is running on port",port))
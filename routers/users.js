const express = require('express');
const { User } = require('../models/index');
const router = express.Router();
const { Op } = require("sequelize");
const jwt = require('../utils/jwt');

router.route('/users')
    .post(async (req, res) => {
        const { nickname, email, password, confirmPassword} = req.body

        if (password !== confirmPassword) {
            return res.status(400).send({ errorMessage: "패스워드가 일치하지 않습니다."})
        }

        const existUsers = await User.findAll({ 
            where : {
                [Op.or]: [{ nickname}, { email }],
            },
        })
        if(existUsers) {
            return res.status(400).send({ errorMessage: "이미 가입된 이메일이나 닉네임이 있습니다."})
        }

        const user = await User.create({ email,nickname,password });
        res.status(201).send(user);
    });

router.route('/login')
    .post(async (req, res) => {
        const { email, password, name } = req.body
        const user = await User.findOne({ where: req.body})
        return res.json(user ? { token: jwt(user.nickname), user: user} : { msg: "비밀번호가 틀렸습니다."})
    })

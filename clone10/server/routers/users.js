import express from 'express';
import { User } from '../models/index';
import { Op } from "sequelize";

const router = express.Router();

router.route('/')
    .post(async (req, res, next) => {
        try {
            const { nickname, email, realName, password } = req.body
            const isExist = await User.findOne({
                where: {[Op.or]: [{ nickname }, { email }]}
            })
            const errorMessage = "이미 가입된 이메일이 있습니다."
            return res.status(201).json(!isExist ? await User.create(req.body) : {errorMessage})
        }
        
        catch (err) {
            next(err)
        }
    })

    .patch(async (req, res, next) => {
        try {
            const { userId } = req.parmas
            const { image } = req.body
            const user = await User.update({image}, { where: {userId} })
            return res.json(user)
        }
        catch (err) {
            next(err)
        }
    })

module.exports = router
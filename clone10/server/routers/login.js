import express from 'express';
import jwt from '../utils/jwt';
import crypto from '../utils/crypto';
import { User } from '../models/index';
const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email, password: crypto(password)}
            })
            const errorMessage = "이메일 혹은 비밀번호가 틀렸습니다."
            return res.json( user ? { user, token: jwt(user.nickname)}: { errorMessage })
        }

        catch(err) {
            next(err)
        }
    })

module.exports = router
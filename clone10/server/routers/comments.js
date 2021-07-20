import express from 'express';
import { Comment } from '../models/index.js';

const router = express.Router( { mergeParams: true });

router.route('/')
    .get(async (req, res, next) => {
        try {
            const { postId } = req.params
            const comments = await Comment.findAll({ where: { postId }})
            return json(comments)
        }

        catch (err) {
            next(err)
        }
    })

    .post(async (req, res, next) => {
        try {
        // req.body = { content, nickname, postId }
        const comment = await Comment.create(req.body);
        return res.json(comment)
        }

        catch (err) {
            next(err)
        }
    })

router.route('/:commentId')
    .patch((req, res, next) => {
        try {
            //req.body = { content }
            const { commentId } = req.params
            Comment.update(req.body, { where: { commentId }})
            return res.json(true)
        }

        catch(err) {
            next(err)
        }
        
    })

    .delete((req, res, next) => {
        try {
            const { commentId } = req.parmas
            Comment.destroy({ where: { commentId }})
            return res.json(true)
        }
        
        catch (err) {
            next(err)
        }
    })

module.exports = router
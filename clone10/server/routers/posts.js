import express from 'express';
import { Post } from '../models/index';
const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const { nickname} = req.query
            const posts = await Post.findAll(nickname && { where: { nickname }})
            return res.json(posts)
        }
         
        catch (err) {
            next(err)
        }
    })

    .post(async (req, res, next) => {
        try {
            // req.bdoy = { content, nickname, image }
            const post = await Post.create(req.body)
            return res.json(post)   
        }
        
        catch (err) {
            next(err)
        }
    })

router.route('/:postId')
    .get(async (req, res, next) => {
        try {
            const { postId } = req.params
            const post = await Post.findByPk(postId)
            return res.json(post)
        }
        
        catch (err) {
            next(err)
        }
    })

    .patch(async (req, res, next) => {
        try{
            const { postId } = req.params
            const { like } = req.body

            like ? 
                await Post.increment('like', { where : { postId }})
                : await Post.decrement('like', { where : { postId }})

            const postLike = (await Post.findByPk(postId)).like
            return res.json({ postLike })
        }
        
        catch (err) {
            next(err)
        }
    })

    .delete((req, res, next) => {
        try {
            const { postId } = req.params
            Post.destroy({ where: { postId }})
            return res.json(true)
        }


        catch (err) {
            next(err)
        }
    })

module.exports = router
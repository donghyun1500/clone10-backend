const express = require('express');
// const fs = require('fs');
const { Post } = require('../models/index');
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const posts = req.query.nickname ? 
        await Post.findAll({ where: { nickname: req.query.nickname }}) : await Post.findAll()
        return res.json(posts);
    })

    .post(async (req, res) => {
        const post = await Post.create(req.body) // { content, image, nickname }
        return res.json(post);
    })

router.route('/:postId')
    .get(async (req, res) => {
        const post = await Post.findByPk(req.params.postId)
        return res.json(post)
    })

    .patch((req, res) => {
        if (req.body.like) Post.increment('like', { where : { postId : req.params.postId }})
        else Post.decrement('like', { where : { postId : req.params.postId }})
        const post = await Post.findByPk(req.params.postId)
        return res.json((post.like))
    })

    .delete((req, res) => {
        Post.destroy({ where: { postId : req.params.postId }})
        return res.json(true)
    })

module.exports = router
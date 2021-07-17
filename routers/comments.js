const express = require('express');
const { Comment } = require('../models/index');
const router = express.Router( { mergeParams: true });

router.route('/')
    .get(async (req, res) => {
        const comments = await Comment.findAll({ where: { postId: req.params.postId } })
        return res.json(comments);
    })

    .post(async (req, res) => {
        // req.body = { content, nickname, postId }
        const comment = await Comment.create(req.body);
        return res.json(comment)
    })

router.route('/:commentId')
    .patch((req, res) => {
        Comment.update(req.body, { where: { commentId: req.params.commentId }})
        return res.json(true)
    })

    .delete((req, res) => {
        Comment.destroy({ where: { commentId: req.params.commentId }})
        return res.json(true)
    })

module.exports = router
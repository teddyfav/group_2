const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models')

router.post('/posts', async (req, res) => {
    try {
        const {
            title,
            content
        } = req.body;
        const newPost = {
            title, content
        };
        const post = new Post(newPost);
        await post.save();

        return res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        throw new Error(`Error creating a post: ${error.message}`)
    }
});
router.post('/posts/:postID/comments', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error creating a comment on a post: ${error.message}`)
    }
});

router.get('/posts', (req, res) => {
    try {
        
    } catch (error) {
        throw new Error(`Error getting all posts: ${error.message}`)
    }
});
router.get('/posts/:postID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error getting a post by ID: ${error.message}`)
    }
});
router.get('/posts/:postID/comments', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error getting all comments on a post: ${error.message}`)
    }
});
router.get('/posts/:postID/comments/:commentID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error getting a comment on a post: ${error.message}`)
    }
});

router.put('/posts/:postID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error updating a post: ${error.message}`)
    }
});
router.put('/posts/:postID/comments/:commentID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error updating a comment on a post: ${error.message}`)
    }
});

router.delete('/posts', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error deleting all posts: ${error.message}`)
    }
});
router.delete('/posts/:postID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error deleting a post: ${error.message}`)
    }
});
router.delete('/posts/:postID/comments', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error deleting all comments on a post: ${error.message}`)
    }
});
router.delete('/posts/:postID/comments/:commentID', (req, res) => {
    try {

    } catch (error) {
        throw new Error(`Error deleting a comment on a post: ${error.message}`)
    }
});



module.exports = router;
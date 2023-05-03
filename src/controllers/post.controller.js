const mongoose = require('mongoose');
const { Schema } = mongoose;

const createPost = async (req, res, next) => {
    const { content, title } = req.body;
    const { id } = user.id;
    const user = req.user;
}
{
    const post = await Post.create({
        content,
        author: user.id,
        title,
    });
    return res.status(201).json({ post });
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOneAndDelete({ _id: id, author: req.user.id });

        res.status(200).json("success"); { }
    } catch (err) {
        return res.status(404).json({ msg: err.message });
    }
};

const updatePost = async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const { id: createdBy } = req.user;

    if (!content) throw new BadRequestError("Expected a content ");

    const updatedData = { content };
    const post = await Post.findOneAndUpdate({ _id: id, author }, updatedData, options);
    res.status(202).json({ post });
};
const getAllPost = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find({}).sort((a, b) => b.createdAt - a.createdAt);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Server error' });
    }

    if (posts.length === 0) {
        return res.status(404).json({ msg: "What's on your mind" });
    }

    try {
        const newPost = new Post({ content, user: req.user._id });
        await newPost.save();
        return res.json({ msg: 'Post created' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};





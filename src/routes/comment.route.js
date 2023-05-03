const express = require("express");
const router = express.Router();

// Assuming there is a database module that provides access to the database
const db = require("../database");

// Get all comments under a post
router.get("/posts/:postId/comments", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const comments = await db.getCommentsByPostId(postId);
    // Filter out deleted comments
    const filteredComments = comments.filter((comment) => !comment.deleted);
    res.json(filteredComments);
  } catch (err) {
    next(err);
  }
});

// Get a single comment
router.get("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await db.getCommentById(commentId);
    // Return 404 if the comment is deleted
    if (comment.deleted) {
      return res.status(404).end();
    }
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Update a comment
router.put("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await db.getCommentById(commentId);
    // Return 404 if the comment is deleted
    if (comment.deleted) {
      return res.status(404).end();
    }
    // Check if the comment is a reply
    if (comment.parentCommentId) {
      return res.status(400).json({ error: "Replies cannot be updated" });
    }
    // Check if the user is authorized to update the comment
    if (req.user.id !== comment.authorId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this comment" });
    }
    // Update the comment in the database
    const updatedComment = await db.updateComment(commentId, req.body);
    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});

// Delete a comment
router.delete("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await db.getCommentById(commentId);
    // Return 404 if the comment is already deleted
    if (comment.deleted) {
      return res.status(404).end();
    }
    // Check if the user is authorized to delete the comment
    if (comment.parentCommentId) {
      // A reply can only be deleted by the post author or its author
      const parentComment = await db.getCommentById(comment.parentCommentId);
      const post = await db.getPostById(parentComment.postId);
      if (req.user.id !== post.authorId && req.user.id !== comment.authorId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this reply" });
      }
    } else {
      // Aonst express = require('express');
      const router = express.Router();

      // Assuming there is a database module that provides access to the database
      const db = require("../database");

      // Get all comments under a post
      router.get("/posts/:postId/comments", async (req, res, next) => {
        try {
          const postId = req.params.postId;
          const comments = await db.getCommentsByPostId(postId);
          // Filter out deleted comments
          const filteredComments = comments.filter(
            (comment) => !comment.deleted
          );
          res.json(filteredComments);
        } catch (err) {
          next(err);
        }
      });

      // Get a single comment
      router.get("/comments/:commentId", async (req, res, next) => {
        try {
          const commentId = req.params.commentId;
          const comment = await db.getCommentById(commentId);
          // Return 404 if the comment is deleted
          if (comment.deleted) {
            return res.status(404).end();
          }
          res.json(comment);
        } catch (err) {
          next(err);
        }
      });

      // Update a comment
      router.put("/comments/:commentId", async (req, res, next) => {
        try {
          const commentId = req.params.commentId;
          const comment = await db.getCommentById(commentId);
          // Return 404 if the comment is deleted
          if (comment.deleted) {
            return res.status(404).end();
          }
          // Check if the comment is a reply
          if (comment.parentCommentId) {
            return res.status(400).json({ error: "Replies cannot be updated" });
          }
          // Check if the user is authorized to update the comment
          if (req.user.id !== comment.authorId) {
            return res
              .status(403)
              .json({ error: "You are not authorized to update this comment" });
          }
          // Update the comment in the database
          const updatedComment = await db.updateComment(commentId, req.body);
          res.json(updatedComment);
        } catch (err) {
          next(err);
        }
      });

      // Delete a comment
      router.delete("/comments/:commentId", async (req, res, next) => {
        try {
          const commentId = req.params.commentId;
          const comment = await db.getCommentById(commentId);
          // Return 404 if the comment is already deleted
          if (comment.deleted) {
            return res.status(404).end();
          }
          // Check if the user is authorized to delete the comment
          if (comment.parentCommentId) {
            // A reply can only be deleted by the post author or its author
            const parentComment = await db.getCommentById(
              comment.parentCommentId
            );
            const post = await db.getPostById(parentComment.postId);
            if (
              req.user.id !== post.authorId &&
              req.user.id !== comment.authorId
            ) {
              return res
                .status(403)
                .json({ error: "You are not authorized to delete this reply" });
            }
          } else {
            // A top-level comment can be deleted by the post author or its author
            const post = await db.getPostById(comment.postId);
            if (
              req.user.id !== post.authorId &&
              req.user.id !== comment.authorId
            ) {
              return res.status(403).json({
                error: "You are not authorized to delete this comment",
              });
            }
          }
          // Mark the comment as deleted in the database
          await db.deleteComment(commentId);
          res.status(204).end();
        } catch (err) {
          next(err);
        }
      });

      // Create a comment
      router.post("/posts/:postId/comments");
      //comment can be deleted by the post author or its author
      const post = await db.getPostById(comment.postId);
      if (req.user.id !== post.authorId && req.user.id !== comment.authorId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this comment" });
      }
    }
    // Mark the comment as deleted in the database
    await db.deleteComment(commentId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});


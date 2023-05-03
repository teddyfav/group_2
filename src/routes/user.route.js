const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/User", async (req, res) => {
  const newUser = {
    username: req.body.username,
    firstname: req.body.firstname,
    email: req.body.email,
  };

  const user = new User(newUser);
  user.save();

  return res.status(201).json({
    success: true,
    user,
  });
  try {
  } catch (error) {
    throw new error(`error creating a user ${error.message}`);
  }
});
module.exports = router;

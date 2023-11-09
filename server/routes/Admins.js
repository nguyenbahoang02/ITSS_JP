const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// Sign up
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    try {
      await Users.create({ email, password: hash, name, RoleId: 2 });
      return res.json("SUCCESS!");
    } catch (error) {
      return res.json(error);
    }
  });
});

module.exports = router;

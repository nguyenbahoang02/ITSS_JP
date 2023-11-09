const express = require("express");
const router = express.Router();
const { Roles } = require("../models");

// Create role
router.post("/", async (req, res) => {
  const role = req.body;
  try {
    await Roles.create(role);
    res.json(role);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

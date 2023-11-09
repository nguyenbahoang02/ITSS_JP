const express = require("express");
const router = express.Router();
const { Meanings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Create Meaning for word
router.post("/:wordId", validateToken, async (req, res) => {
  const meaning = req.body;
  const wordId = parseInt(req.params.wordId);
  try {
    await Meanings.create({ ...meaning, WordId: wordId });
    return res.json("success");
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }

  try {
    await Meanings.destroy({ where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

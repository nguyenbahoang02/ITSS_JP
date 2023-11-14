const express = require("express");
const router = express.Router();
const { Requests } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Create Request
router.post("/", validateToken, async (req, res) => {
  // 0 1 2
  const { word, meaning, example } = req.body;
  try {
    const request = await Requests.create({
      ...word,
      ...meaning,
      example: example.example,
      exampleMeaning: example.meaning,
      approved: 0,
    });
    res.json(request);
  } catch (error) {
    res.json(error);
  }
});

// Update request
router.put("/:id", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const id = parseInt(req.params.id);
  const { approved } = req.body;
  try {
    await Requests.update({ approved }, { where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Progress } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get progress by lessonId
router.get("/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
    const userId = req.user.id;
  try {
    const progress = await Progress.findAll({
      where: { LessonId: id, UserId: userId },
    });
    return res.json(progress);
  } catch (error) {
    res.json(error);
  }
});

// update progress
router.post("/:lessonId/:percentage", validateToken, async (req, res) => {
  const LessonId = parseInt(req.params.lessonId);
  const Percentage = parseFloat(req.params.percentage);
  const UserId = req.user.id;
  try {
    await Progress.update(
      { status: Percentage },
      { where: { LessonId, UserId } }
    );
    res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

// Create progress
router.post("/:id", validateToken, async (req, res) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id);

  try {
    await Progress.create({ status: 0, LessonId: id, UserId: userId });
    res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

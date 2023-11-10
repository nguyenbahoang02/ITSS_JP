const express = require("express");
const router = express.Router();
const { Lessons, LessonWords, Words } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all words of Lesson

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const List = await Lessons.findAll({
      where: { id: id },
      include: [
        {
          model: Words,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.json(List);
  } catch (error) {
    res.json(error);
  }
});

// Create lesson
router.post("/", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }

  const lesson = req.body;
  try {
    await Lessons.create(lesson);
    res.json(lesson);
  } catch (error) {
    res.json(error);
  }
});

// Add word to Lesson
router.post("/:lessonId/:wordId", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }

  const LessonId = parseInt(req.params.lessonId);
  const WordId = parseInt(req.params.wordId);
  try {
    await LessonWords.create({ LessonId, WordId });
    res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

// Delete lesson
router.delete("/:id", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }

  const id = parseInt(req.params.id);
  try {
    await Lessons.destroy({ where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

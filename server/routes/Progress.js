const express = require("express");
const router = express.Router();
const { Progress, FlashCards } = require("../models");
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
router.post("/:id", validateToken, async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const id = parseInt(req.params.id);

  try {
    await Progress.create({ status: 0, LessonId: id, UserId: userId });
    const List = await FlashCards.findAll({ where: { LessonId: id } });
    for (const item of List) {
      if (!item.userIds) {
        item.userIds = item.userIds + `${userId}`;
        item.statuses = item.statuses + "0";
      } else {
        if (item.userIds.split(",").indexOf(`${userId}`) !== -1) {
          throw "Lesson is started!";
        } else {
          item.userIds = [...item.userIds.split(","), `${userId}`].join(",");
          item.statuses = [...item.statuses.split(","), "0"].join(",");
        }
      }
      await item.save({ fields: ["userIds", "statuses"] });
    }
    return res.json("SUCCESS!");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

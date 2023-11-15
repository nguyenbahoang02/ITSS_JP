const express = require("express");
const router = express.Router();
const { Questions, Quizzes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get Questions of Quiz
router.get("/:quizId", validateToken, async (req, res) => {
  const QuizId = parseInt(req.params.quizId);
  try {
    const questions = await Questions.findAll({
      where: { QuizId },
    });
    res.json(questions);
  } catch (error) {
    res.json(error);
  }
});

// Create Questions for quiz
router.post("/:quizId", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const QuizId = parseInt(req.params.quizId);
  const { question } = req.body;
  try {
    await Questions.create({
      ...question,
      QuizId,
    });
    const quiz = await Quizzes.findOne({ where: { id: QuizId } });
    quiz.totalScore += question.score;
    quiz.save({ fields: ["totalScore"] });
    res.json(question);
  } catch (error) {
    res.json(error);
  }
});

// Update Question
router.put("/:quizId/:id", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const id = parseInt(req.params.id);
  const QuizId = parseInt(req.params.quizId);
  const { question, lastScore } = req.body;
  try {
    await Questions.update(question, { where: { id: id } });
    const quiz = await Quizzes.findOne({ where: { id: QuizId } });
    quiz.totalScore = quiz.totalScore - lastScore + question.score;
    await quiz.save({ fields: ["totalScore"] });
    res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

// Delete Question
router.delete("/:id", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const id = parseInt(req.params.id);
  try {
    const question = await Questions.findOne({ where: { id: id } });
    const quiz = await Quizzes.findOne({ where: { id: question.QuizId } });
    quiz.totalScore -= question.score;
    await quiz.save({ fields: ["totalScore"] });
    await question.destroy();
    res.json("SUCCESS!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

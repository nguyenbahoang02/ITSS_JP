const express = require('express');
const router = express.Router();
const { Quizzes, Lessons } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// Get Quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quizzes.findAll({
            include: [
                {
                    model: Lessons,
                },
            ],
        });
        res.json(quizzes);
    } catch (error) {
        res.json(error);
    }
});

// Get Quiz
router.get('/:lessonId', async (req, res) => {
    const LessonId = parseInt(req.params.lessonId);

    try {
        const quizzes = await Quizzes.findOne({
            where: {
                LessonId,
            },
        });
        res.json(quizzes);
    } catch (error) {
        res.json(error);
    }
});

// Create Quiz
router.post('/:lessonId', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }
    const LessonId = parseInt(req.params.lessonId);
    try {
        const quiz = await Quizzes.create({
            LessonId,
            totalScore: 0,
        });
        res.json(quiz);
    } catch (error) {
        res.json(error);
    }
});

// Update totalScore of Quiz
router.put('/:id', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }
    const id = parseInt(req.params.id);
    const { totalScore } = req.body;
    try {
        await Quizzes.update({ totalScore }, { where: { id: id } });
        res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

// Delete Quiz
router.delete('/:id', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }
    const id = parseInt(req.params.id);
    try {
        await Quizzes.destroy({ where: { id: id } });
        res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;

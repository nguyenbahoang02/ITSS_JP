const express = require('express');
const router = express.Router();
const { Lessons, LessonWords, Words, FlashCards } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

//Get all lesson

router.get('/', async (req, res) => {
    try {
        const ListLesson = await Lessons.findAll({
            include: [
                {
                    model: Words,
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        return res.json(ListLesson);
    } catch (error) {
        res.json(error);
    }
});

// Get all words of Lesson

router.get('/:id', async (req, res) => {
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
router.post('/', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
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
router.post('/:lessonId/:wordId', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }

    const LessonId = parseInt(req.params.lessonId);
    const WordId = parseInt(req.params.wordId);
    try {
        const flashCard = await FlashCards.create({ WordId, LessonId });
        await LessonWords.create({ LessonId, WordId, FlashCardId: flashCard.id });
        res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

// Update Lesson
router.put('/:lessonId', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }

    const LessonId = parseInt(req.params.lessonId);
    const { words } = req.body;

    try {
        await LessonWords.destroy({ where: { LessonId } });
        words.map(async (WordId) => {
            await LessonWords.create({ LessonId, WordId });
        });
        res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

// Delete word from Lesson
router.delete('/:lessonId/:wordId', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }

    const LessonId = parseInt(req.params.lessonId);
    const WordId = parseInt(req.params.wordId);

    try {
        await LessonWords.destroy({ where: { LessonId, WordId } });
        res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

// Delete lesson
router.delete('/:id', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }

    const id = parseInt(req.params.id);
    try {
        await Lessons.destroy({ where: { id: id } });
        return res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Words, FlashCards, Meanings, Examples } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// Get flashcard
router.get('/:lessonId', validateToken, async (req, res) => {
    const lessonId = parseInt(req.params.lessonId);
    const userId = req.user.id;
    try {
        const flashCards = await FlashCards.findAll({
            where: { LessonId: lessonId },
            attributes: ['statuses', 'userIds'],
            include: [
                {
                    model: Words,
                    attributes: ['word', 'furigana'],
                    include: [
                        {
                            model: Meanings,
                            attributes: ['meaning', 'description', 'img', 'src'],
                        },
                    ],
                },
            ],
        });
        const index = flashCards[0].userIds.split(',').indexOf(`${userId}`);
        const result = flashCards.map((card) => {
            return { statuses: card.statuses.split(',')[index], Word: card.Word };
        });
        return res.json({ flashCards: result });
    } catch (error) {
        return res.json(error);
    }
});

// Update flashcards
router.put('/:lessonId', validateToken, async (req, res) => {
    const { words } = req.body;
    const lessonId = parseInt(req.params.lessonId);
    const userId = req.user.id;
    try {
        words.forEach(async (word) => {
            const { WordId, status } = word;
            const card = await FlashCards.findOne({
                where: { LessonId: lessonId, WordId },
            });
            const i = card.userIds.split(',').indexOf(`${userId}`);
            card.statuses = card.statuses
                .split(',')
                .map((item, index) => {
                    if (index === i) {
                        return `${status}`;
                    } else return item;
                })
                .join(',');
            card.save({ fields: ['statuses'] });
        });

        return res.json('success');
    } catch (error) {
        return res.json(error);
    }
});

// delete
router.delete('/:lessonId/:flashCardId', validateToken, async (req, res) => {
    const lessonId = parseInt(req.params.lessonId);
    const flashCardId = parseInt(req.params.flashCardId);
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }

    try {
        await FlashCards.destroy({
            where: {
                id: flashCardId,
                LessonId: lessonId,
            },
        });
        return res.json('success');
    } catch (error) {
        return res.json(error);
    }
});

module.exports = router;

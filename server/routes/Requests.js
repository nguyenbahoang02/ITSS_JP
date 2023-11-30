const express = require('express');
const router = express.Router();
const { Requests, Words, Meanings, Examples, ExampleOfMeaning } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }
    try {
        const list = await Requests.findAll({ where: { approved: 0 } });
        res.json(list);
    } catch (error) {
        res.json(error);
    }
});

// Create Request
router.post('/', validateToken, async (req, res) => {
    // 0 1 2
    const { word, meaning, example } = req.body;
    try {
        const request = await Requests.create({
            ...word,
            ...meaning,
            example: example.example,
            exampleMeaning: example.meaning,
            approved: 0,
            UserId: req.user,
        });
        res.json(request);
    } catch (error) {
        res.json(error);
    }
});

// Update request
router.put('/:id', validateToken, async (req, res) => {
    if (req.user.RoleId !== 2) {
        return res.json('You are not authorization!');
    }
    const id = parseInt(req.params.id);
    try {
        if (req.body.approved === 1) {
            const newWord = await Words.create({ word: req.body.word, furigana: req.body.furigana });
            const newMeaning = await Meanings.create({
                meaning: req.body.meaning,
                description: req.body.description,
                WordId: newWord.id,
            });
            const newExample = await Examples.create({ example: req.body.example, meaning: req.body.exampleMeaning });
            await ExampleOfMeaning.create({
                ExampleId: newExample.id,
                MeaningId: newMeaning.id,
            });
        }
        await Requests.update({ approved: req.body.approved }, { where: { id: id } });
        return res.json('SUCCESS!');
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;

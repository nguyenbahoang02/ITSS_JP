const express = require("express");
const router = express.Router();
const { Words, Meanings, Examples } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get All Words
router.get("/", async (req, res) => {
  try {
    const listWords = await Words.findAll();
    return res.json(listWords);
  } catch (error) {
    return res.json(error);
  }
});

// Get Word
router.get("/:wordId", async (req, res) => {
  const wordId = parseInt(req.params.wordId);

  try {
    const word = await Words.findOne({ where: { id: wordId } });
    const listMeanings = await Meanings.findAll({
      where: { WordId: wordId },
      include: [
        {
          model: Examples,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json({ word, listMeanings });
  } catch (error) {
    return res.json(error);
  }
});

// Create Word
router.post("/", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const { word, meaning } = req.body;
  try {
    const newWord = await Words.create(word);
    await Meanings.create({ ...meaning, WordId: newWord.id });
    return res.json("success");
  } catch (error) {
    return res.json(error);
  }
});

// Update word
router.put("/update/:wordId", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  const { word, meanings } = req.body;
  const wordId = parseInt(req.params.wordId);
  try {
    await Words.update(word, { where: { id: wordId } });
    try {
      await Meanings.destroy({ where: { WordId: wordId } });
    } catch (error) {
      return res.json(error);
    }

    meanings.forEach(async (element) => {
      try {
        await Meanings.create({ ...element, WordId: wordId });
      } catch (error) {
        return res.json(error);
      }
    });
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
    await Meanings.destroy({ where: { WordId: id } });
  } catch (error) {
    return res.json(error);
  }

  try {
    await Words.destroy({ where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

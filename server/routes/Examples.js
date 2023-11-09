const express = require("express");
const router = express.Router();
const { Examples, Meanings, ExampleOfMeaning } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Create Example for meaning
router.post("/:meaningId", validateToken, async (req, res) => {
  const example = req.body;
  const meaningId = parseInt(req.params.meaningId);
  try {
    const newExample = await Examples.create(example);
    await ExampleOfMeaning.create({
      ExampleId: newExample.id,
      MeaningId: meaningId,
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
    await Examples.destroy({ where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Users, Words, SearchHistory } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// Get All users
router.get("/", validateToken, async (req, res) => {
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }
  try {
    const listUsers = await Users.findAll({
      attributes: {
        exclude: ["password", "RoleId"],
      },
    });
    return res.json(listUsers);
  } catch (error) {
    return res.json(error);
  }
});

// Sign up
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    try {
      await Users.create({ email, password: hash, name, RoleId: 1 });
      return res.json("SUCCESS!");
    } catch (error) {
      return res.json(error);
    }
  });
});

// Sign in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const User = await Users.findOne({ where: { email: email } });

  if (!User) {
    return res.json({ error: "User do not exist!" });
  }

  bcrypt.compare(password, User.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong password!" });
    }

    const accessToken = sign(
      { username: User.name, id: User.id, RoleId: User.RoleId },
      "secretkey",
      { expiresIn: "1h" }
    );

    return res.json({ name: User.name, email: User.email, token: accessToken });
  });
});

// Update
router.put("/update/:id", validateToken, async (req, res) => {
  const { password, name } = req.body;
  const id = parseInt(req.params.id);
  if (req.user.RoleId === 2 || req.user.id === id) {
    bcrypt.hash(password, 10).then(async (hash) => {
      try {
        await Users.update({ password: hash, name }, { where: { id: id } });
        return res.json("SUCCESS!");
      } catch (error) {
        return res.json(error);
      }
    });
  } else return res.json("You are not authorization!");
});

// Delete
router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.RoleId !== 2) {
    return res.json("You are not authorization!");
  }

  try {
    await Users.destroy({ where: { id: id } });
    return res.json("SUCCESS!");
  } catch (error) {
    return res.json(error);
  }
});

// Get search history by userId
router.get("/search-history/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.RoleId !== 2 || req.user.id !== id) {
    return res.json("You are not authorization!");
  }
  try {
    const list = await Users.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: Words,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "RoleId", "createdAt", "updatedAt"],
      },
    });
    return res.json(list);
  } catch (error) {
    return res.json(error);
  }
});

// Create search history
router.post("/search-history/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { WordId } = req.body;
  if (req.user.RoleId !== 2 || req.user.id !== id) {
    return res.json("You are not authorization!");
  }
  try {
    const record = await SearchHistory.create({ UserId: id, WordId });
    return res.json(record);
  } catch (error) {
    return res.json(error);
  }
});

// Update search history
router.put("/search-history/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { WordId } = req.body;
  if (req.user.RoleId !== 2 || req.user.id !== id) {
    return res.json("You are not authorization!");
  }
  try {
    const record = await SearchHistory.update(
      { WordId },
      { where: { WordId: WordId } }
    );
    return res.json(record);
  } catch (error) {
    return res.json(error);
  }
});

// Delete search history by wordId
router.delete("/search-history/:id", validateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const record = await SearchHistory.findOne({ where: { WordId: id } });
    if (req.user.RoleId !== 2 || req.user.id !== record.UserId) {
      return res.json("You are not authorization!");
    }
    record.destroy();
    return res.json("Success");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

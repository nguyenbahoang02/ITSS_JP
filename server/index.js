const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouters = require("./routes/Users");
app.use("/users", userRouters);

const adminRouters = require("./routes/Admins");
app.use("/admins", adminRouters);

const roleRouters = require("./routes/Roles");
app.use("/roles", roleRouters);

const wordRouters = require("./routes/Words");
app.use("/words", wordRouters);

const meaningRouters = require("./routes/Meanings");
app.use("/meanings", meaningRouters);

const examplesRouters = require("./routes/Examples");
app.use("/examples", examplesRouters);

db.sequelize.sync().then(() => {
  app.listen("3001", () => {
    console.log("Server running on port 3001!");
  });
});

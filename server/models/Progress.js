const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Progress = sequelize.define("Progress", {
    status: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: true,
    },
  });

  return Progress;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Quizzes = sequelize.define("Quizzes", {
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Quizzes.associate = (models) => {
    Quizzes.hasMany(models.Questions, {
      onDelete: "cascade",
      allowNull: false,
    });

    Quizzes.belongsTo(models.Lessons, {
      allowNull: false,
    });
  };

  return Quizzes;
};

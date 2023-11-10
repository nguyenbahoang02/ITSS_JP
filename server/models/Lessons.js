const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Lessons = sequelize.define("Lessons", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Lessons.associate = (models) => {
    Lessons.belongsToMany(models.Words, {
      through: models.LessonWords,
    });
    Lessons.hasMany(models.LessonWords);
    Lessons.hasMany(models.Progress);

  };

  return Lessons;
};

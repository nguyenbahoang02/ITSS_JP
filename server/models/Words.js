const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Words = sequelize.define("Words", {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    furigana: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Words.associate = (models) => {
    Words.hasMany(models.Meanings, {
      onDelete: "cascade",
      allowNull: false,
    });
    Words.belongsToMany(models.Users, {
      through: models.SearchHistory,
    });
    Words.hasMany(models.SearchHistory);
    Words.hasMany(models.LessonWords);
    Words.hasOne(models.FlashCards);
  };

  return Words;
};

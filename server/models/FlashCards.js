const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const FlashCards = sequelize.define("FlashCards", {
    userIds: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },

    statuses: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  });

  FlashCards.associate = (models) => {
    FlashCards.belongsTo(models.Words);
    FlashCards.belongsTo(models.Lessons);
  };

  return FlashCards;
};

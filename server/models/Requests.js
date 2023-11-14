const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Requests = sequelize.define("Requests", {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    furigana: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    example: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exampleMeaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    approved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Requests.associate = (models) => {
    Requests.belongsTo(models.Users, {
      allowNull: false,
    });
  };

  return Requests;
};

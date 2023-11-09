const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Meanings = sequelize.define("Meanings", {
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
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
  });

  Meanings.associate = (models) => {
    Meanings.belongsTo(models.Words, {
      allowNull: false,
    });
    Meanings.belongsToMany(models.Examples, {
      through: models.ExampleOfMeaning,
    });
    Meanings.hasMany(models.ExampleOfMeaning);
  };

  return Meanings;
};

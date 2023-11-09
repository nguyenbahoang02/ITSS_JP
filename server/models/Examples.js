const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Examples = sequelize.define("Examples", {
    example: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Examples.associate = (models) => {
    Examples.belongsToMany(models.Meanings, {
      through: models.ExampleOfMeaning,
    });
    Examples.hasMany(models.ExampleOfMeaning);
  };

  return Examples;
};

const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  const Roles = sequelize.define("Roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Users, {
      onDelete: "cascade",
      allowNull: false,
    });
  };
  return Roles;
};

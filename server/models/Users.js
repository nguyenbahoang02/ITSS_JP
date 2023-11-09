const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
      allowNull: false,
    });
    Users.belongsToMany(models.Words, {
      through: models.SearchHistory,
    });
    Users.hasMany(models.SearchHistory);
  };

  return Users;
};

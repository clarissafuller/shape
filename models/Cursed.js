const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cursed extends Model {}

Cursed.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    routine_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "cursed",
  }
);

module.exports = Cursed;

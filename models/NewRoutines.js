const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class NewRoutine extends Model {}

NewRoutine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    start_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "cursed",
        key: "id",
        unique: false,
      },
    },
    routine_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "routine2",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "NewRoutine",
  }
);

module.exports = NewRoutine;

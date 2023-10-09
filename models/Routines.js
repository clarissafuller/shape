const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Routine2 extends Model {}

Routine2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    routine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    name: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "routine2",
  }
);

module.exports = Routine2;

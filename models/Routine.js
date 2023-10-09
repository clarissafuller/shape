const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Routine extends Model {}

Routine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_template: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    day_of_week: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "routine",
  }
);

module.exports = Routine;

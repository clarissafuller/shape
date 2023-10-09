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
      defaultValue: "Untitled Routine",
    },
    is_template: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    day_of_week: {
      type: DataTypes.STRING,
<<<<<<< HEAD
      allowNull: false,
      defaultValue: "Monday",
=======
>>>>>>> 7ff2fcd7d7ce210731e3922368f2b9e4e5825402
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

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our routine specific exercise model
class RoutineExercise extends Model {}

// create fields/columns for routine/exercise model
RoutineExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "exercise",
        key: "id",
        unique: false,
      },
    },
    routine_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "routine",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "routine_exercise",
  }
);

module.exports = RoutineExercise;

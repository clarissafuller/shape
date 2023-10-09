const User = require("./User");
const Exercise = require("./Exercise");
const Routine = require("./Routine");
const RoutineExercise = require("./Routine-exercise");
const Cursed = require("./Cursed");
const Routine2 = require("./Routines");
const NewRoutine = require("./NewRoutines");

User.hasMany(Routine, {
  foreignKey: "routine_id",
  // onDelete: 'CASCADE'
});

Routine.belongsTo(User, {
  foreignKey: "user_id",
});

Exercise.belongsToMany(Routine, {
  // Define the third table needed to store the foreign keys
  through: {
    model: RoutineExercise,
    unique: false,
  },
  // Define an alias for when data is retrieved
  //   as: "exercise-routine",
});

Routine.belongsToMany(Exercise, {
  // Define the third table needed to store the foreign keys
  through: {
    model: RoutineExercise,
    unique: false,
  },
  // Define an alias for when data is retrieved
  //   as: "routine-exercise",
});

Cursed.belongsToMany(Routine2, {
  // Define the third table needed to store the foreign keys
  through: {
    model: NewRoutine,
    unique: false,
  },
});

Routine2.belongsToMany(Cursed, {
  // Define the third table needed to store the foreign keys
  through: {
    model: NewRoutine,
    unique: false,
  },
});

module.exports = {
  User,
  Exercise,
  Routine,
  RoutineExercise,
  Cursed,
  Routine2,
  NewRoutine,
};

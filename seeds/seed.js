const sequelize = require("../config/connection");
const { User, Exercise, Routine } = require("../models");

const userData = require("./userData.json");
const exerciseData = require("./exerciseData.json");
const routineData = require("./routineData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Exercise.bulkCreate(exerciseData);
  await Routine.bulkCreate(routineData);

  process.exit(0);
};

seedDatabase();

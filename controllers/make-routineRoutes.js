const router = require("express").Router();
const { Exercise } = require("../models");

// GET all exercises for make-routine page
router.get("/:id", async (req, res) => {
  try {
    const dbExerciseData = await Exercise.findAll();

    const exercises = dbExerciseData.map((exercise) =>
      exercise.get({ plain: true })
    );

    res.render("make-routine", {
      exercises,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one exercise
router.get("/exercise/:id", async (req, res) => {
  try {
    const dbExerciseData = await Exercise.findByPk(req.params.id);

    const exercise = dbExerciseData.get({ plain: true });
    res.render("make-routine", { exercise });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

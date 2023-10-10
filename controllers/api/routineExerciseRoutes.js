const router = require("express").Router();
const { RoutineExercise } = require("../../models");

// CREATE a routine-exercise
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const routineExerciseData = await RoutineExercise.create(req.body);
    res.status(200).json(routineExerciseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a routine-exercise
router.delete("/:id", async (req, res) => {
  try {
    const routineExerciseData = await RoutineExercise.destroy({
      where: { id: req.params.id },
    });
    if (!routineExerciseData) {
      res.status(404).json({ message: "No routine-exercise with this id!" });
      return;
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

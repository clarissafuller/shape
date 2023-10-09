//dependencies
const router = require("express").Router();

const {
  Routine,
  Exercise,
  RoutineExercise,
  Routine2,
  Cursed,
  NewRoutine,
} = require("../../models");

// GET ALL request
// api/routines
router.get("/", async (req, res) => {
  try {
    const routineData = await Routine.findAll({
      include: [
        {
          model: Exercise,
          through: RoutineExercise,
          // as: "Workout",
          // attributes: [
          //   "name",
          //   "type",
          //   "muscle",
          //   "equipment",
          //   "difficulty",
          //   "instructions",
          // ],
        },
      ],
    });

    const routines = routineData.map((routine) => routine.get({ plain: true }));
    // ***** May need to swap out the render page ******
    res.status(200).json(routines);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE request
// api/routines/:id
router.get("/:id", async (req, res) => {
  try {
    // findByPk for finding your pick by primary key (set to req.params.id here)
    const routineData = await Routine.findByPk(req.params.id);
    console.log(routineData);
    res.status(200).json(routineData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST ONE request (create)
// api/routines
router.post("/add", async (req, res) => {
  try {
    const { name, start_date, start_time, end_time } = req.body;

    const info = {
      routine_id: id,
      name,
      start_date,
      start_time,
      end_time,
    };
    const newRoutine = await Routine.create(info);
    // .json(newRoutine);
    console.log(newRoutine);
    res.status(200).json(newRoutine);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/addroutine", async (req, res) => {
  try {
    const { routine_id, name, start_date, start_time, end_time } = req.body;

    const info = {
      routine_id,
      name,
      start_date,
      start_time,
      end_time,
    };
    const newRoutine = await Routine2.create(info);
    // .json(newRoutine);
    console.log(newRoutine);
    res.status(200).json(newRoutine);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE ONE request
// api/routines/:id
router.delete("/:id", async (req, res) => {
  try {
    const routine = await Routine.findByPk(req.params.id);

    if (!routine) {
      res.status(404).json("No routine found with this id!");
      return;
    }

    await routine.destroy();

    const responseMessage = `Routine deleted successfully. Name: ${routine.name}`;
    res.status(200).json(responseMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

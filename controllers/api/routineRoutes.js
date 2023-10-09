const router = require("express").Router();

const { Routine, Exercise, RoutineExercise } = require("../../models");

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
// router.post("/", async (req, res) => {
//   try {
//     const newRoutine = await Routine.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newRoutine);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const routineData = await Routine.create({
      routine_id: req.body.routine_id,
    });
    res.status(200).json(routineData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates routine based on its id
router.put("/:id", (req, res) => {
  // Calls the update method on the Book model
  Routine.update(
    {
      // All the fields you can update and the data attached to the request body.
      name: req.body.name,
      day_of_week: req.body.day_of_week,
    },
    {
      // Gets the routine based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedRoutine) => {
      // Sends the updated routine as a json response
      res.json(updatedRoutine);
    })
    .catch((err) => res.json(err));
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

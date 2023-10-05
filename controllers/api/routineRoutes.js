const router = require("express").Router();
const Routine = require("../../models/Routine.js");

// GET ALL request
// api/routines
router.get("/", async (req, res) => {
  try {
    const routineData = await Routine.findAll({});

    const routines = routineData.map((routine) => routine.get({ plain: true }));
    // ***** May need to swap out the render page ******
    res.render("routine", { routines });
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
    res.render("routine", { routineData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST ONE request (create)
// api/routines
router.post("/", async (req, res) => {
  try {
    const newRoutine = await Routine.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRoutine);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE ONE request
// api/routines/:id
// router.delete("/:id", async (req, res) => {
//   try {
//     const routineData = await Routine.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!routineData) {
//       res.status(404).json({ message: "No routine found with this id!" });
//       return;
//     }
//     const responseMessage = `Routine deleted successfully. Name: ${routine.name}`;
//     res.status(200).json(responseMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

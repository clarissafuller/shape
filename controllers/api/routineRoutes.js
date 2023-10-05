const router = require("express").Router();
const Routine = require("../../models/Routine.js");

// GET ALL request
// api/routines
router.get("/", async (req, res) => {
  try {
    const routineData = await Routine.findAll({});

    const routines = routineData.map((routine) => routine.get({ plain: true }));
    // ***** May need to swap out the render page ******
    res.render("routine", {
      routines,
    });
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
    res.render("routine", routineData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

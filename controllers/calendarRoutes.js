const router = require("express").Router();
const { Routine } = require("../models");

// GET all routines for calendar page
router.get("/", async (req, res) => {
  try {
    const dbRoutineData = await Routine.findAll();

    const routines = dbRoutineData.map((routine) =>
      routine.get({ plain: true })
    );

    res.render("calendar", {
      routines,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

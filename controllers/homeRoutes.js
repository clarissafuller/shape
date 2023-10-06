const router = require("express").Router();
const { User, Exercise, Routine } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    //find all the routines
    const dbRoutineData = await Routine.findAll();

    const routines = dbRoutineData.map((routine) =>
      routine.get({ plain: true })
    );

    res.render("homepage", {
      users,
      routines,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for make routines page
router.get("/make-routine", withAuth, async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({});

    const exercises = exerciseData.map((exercise) =>
      exercise.get({ plain: true })
    );
    console.log(exercises);
    res.render("make-routine", {
      exercises,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

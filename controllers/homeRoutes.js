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

    let sundayRoutines = [];
    let mondayRoutines = [];
    let tuesdayRoutines = [];
    let wednesdayRoutines = [];
    let thursdayRoutines = [];
    let fridayRoutines = [];
    let saturdayRoutines = [];

    dbRoutineData.forEach((routine) => {
      const dayOfWeek = routine.day_of_week;
      switch (dayOfWeek) {
        case "Sunday":
          sundayRoutines.push(routine.get({ plain: true }));
          break;
        case "Monday":
          mondayRoutines.push(routine.get({ plain: true }));
          break;
        case "Tuesday":
          tuesdayRoutines.push(routine.get({ plain: true }));
          break;
        case "Wednesday":
          wednesdayRoutines.push(routine.get({ plain: true }));
          break;
        case "Thursday":
          thursdayRoutines.push(routine.get({ plain: true }));
          break;
        case "Friday":
          fridayRoutines.push(routine.get({ plain: true }));
          break;
        case "Saturday":
          saturdayRoutines.push(routine.get({ plain: true }));
          break;
      }
    });

    const routineByDay = {
      Sunday: sundayRoutines,
      Monday: mondayRoutines,
      Tuesday: tuesdayRoutines,
      Wednesday: wednesdayRoutines,
      Thursday: thursdayRoutines,
      Friday: fridayRoutines,
      Saturday: saturdayRoutines,
    };

    // const routines = dbRoutineData.map((routine) =>
    //   routine.get({ plain: true })
    // );

    res.render("homepage", {
      users,
      routineByDay,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //route for make routines page
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

router.get("/signup", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;

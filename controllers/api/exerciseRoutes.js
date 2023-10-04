const router = require("express").Router();

const { Op } = require("sequelize");
const { Exercise, Routine } = require("../../models");
const { getAPIExercises } = require("../../utils/helpers");

//search by exercise
router.post("/search", async (req, res) => {
  //try to get exercise by name from database
  try {
    let exerciseData;
    const bodyItems = Object.keys(req.body).map((key) => ({
      [key]: req.body[key],
    }));
    console.log("BodyItems", bodyItems);

    exerciseData = await Exercise.findOne({
      where: {
        [Op.and]: bodyItems,
      },
    });
    //  else if (name) {
    //   exerciseData = await Exercise.findOne({
    //     name,
    //   });
    // } else if (muscle) {
    //   exerciseData = await Exercise.findOne({
    //     muscle,
    //   });
    // }
    res.json(exerciseData);
    // if (!exerciseData) {
    //   // third party api call
    //   const exercise = getAPIExercises();
    //   res.json(exercise);
    // }

    // const exerciseData = await Exercise.findOne();
    // const exercise = exerciseData.map((exercise) =>
    //   exercise.get({ plain: true })
    // );
    // //if it doesnt exsist in the database already, send out a fetch request to look for it
    // if (!exerciseData) {

    // }
    //if it still doesnt exsist, create the workout (save this for later if we have time)

    // res.render("exercise", {
    //   exercise,
    //  });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all exercises
router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [{ model: Routine }],
    });
    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single exercise
router.get("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [{ model: Routine }],
    });

    if (!exerciseData) {
      res.status(404).json({ message: "No exercise found with that id!" });
      return;
    }

    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an exercise
router.post("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.create({
      routine_id: req.body.routine_id,
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE an exercise
router.delete("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!exerciseData) {
      res.status(404).json({ message: "No exercise found with that id!" });
      return;
    }

    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

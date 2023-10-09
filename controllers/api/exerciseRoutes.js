const router = require("express").Router();

const { Op } = require("sequelize");
const { Exercise, Routine } = require("../../models");
const { getAPIExercises } = require("../../utils/helpers");
const Cursed = require("../../models/Cursed");

router.post("/searchname", async (req, res) => {
  try {
    const exercise = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${req.body.name}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      }
    );
    const exercises = await exercise.json();
    console.log(typeof req.body.name);
    res.json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
});

//search by exercise
router.post("/search", async (req, res) => {
  //try to get exercise by name from database
  console.log("req.body", req.body);

  try {
    let exerciseData;
    const bodyItems = Object.keys(req.body).map((key) => ({
      [key]: req.body[key],
    }));
    console.log("BodyItems", bodyItems);

    exerciseData = await Exercise.findAll({
      where: {
        [Op.and]: bodyItems,
      },
    });

    // //if it doesnt exsist in the database already, send out a fetch request to look for it
    // didn't get back excercises
    if (!exerciseData.length) {
      // third party api call
      // get some from the internet
      const exercise = await getAPIExercises(req.body);
      // add the internet exercises to the database
      await Exercise.bulkCreate(exercise);
      // console.log("it made it here");
      // find all the exercises again
      exerciseData = await Exercise.findAll({
        where: {
          [Op.and]: bodyItems,
        },
      });
      // send back the new result
      res.json(exerciseData);
      return;
    }
    //instead of this, it would take the exercises data and add it to the database
    res.json(exerciseData);
    //if it still doesnt exsist, create the workout (save this for later if we have time)
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all exercises
router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll();
    res.json(exerciseData);
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
router.post("/add", async (req, res) => {
  try {
    const { routine_id, weight, sets, reps, target, instructions, name } =
      req.body;

    const body = {
      routine_id,
      name,
      target,
      sets,
      reps,
      weight,
      instructions,
    };

    console.log(body);

    const exerciseData = await Cursed.create(body);
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

const router = require("express").Router();

const { Exercise, Routine } = require('../../models');
const { getAPIExercises } = require("../../utils/helpers");

//search by exercise 
router.get('/search/', async (req, res) => {
//try to get exercise by name from database
  try {
    const exerciseData = await Exercise.findOne(req.body);
   const exercise = exerciseData.map((exercise) => exercise.get({ plain: true }));
//if it doesnt exsist in the database already, send out a fetch request to look for it
if (!exerciseData) {
  getAPIExercises();
};
//if it still doesnt exsist, create the workout (save this for later if we have time)

res.render("exercise", {
  exercise,
 });
} catch (err) {
  res.status(500).json(err);
}
});


// GET all exercises
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [{ model: Routine }],
    });
    
    if (!exerciseData) {
      res.status(404).json({ message: 'No exercise found with that id!' });
      return;
    }

    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an exercise
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id,
      },
    });
     if (!exerciseData) {
      res.status(404).json({ message: 'No exercise found with that id!' });
      return;
    }

    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router

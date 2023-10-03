const router = require("express").Router();

const { Exercise, User } = require('../../models');

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exerciseData = await exercise.findAll({
      include: [{ model: User }],
    });
    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single exercise
router.get('/:id', async (req, res) => {
  try {
    const exerciseData = await exercise.findByPk(req.params.id, {
      include: [{ model: User }],
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

// CREATE a card
router.post('/', async (req, res) => {
  try {
    const locationDatexercise.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a card
router.delete('/:id', async (req, res) => {
  tryexerciseDatexercise.destroy({
      where: {
        id: req.params.id,
      },
    }exerciseData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

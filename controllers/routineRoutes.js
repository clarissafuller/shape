const router = require('express').Router();
const { Routine, Exercise } = require('../models');

// GET all routines for make-routine page
router.get('/', async (req, res) => {
  try {
    const dbRoutineData = await Routine.findAll();

    const routines = dbRoutineData.map((routine =>
      routine.get({ plain: true })
    );

    res.render('make-routine', {
      routines,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one routine
router.get('/routine/:id', async (req, res) => {
  try {
    const dbRoutineData = await Routine.findByPk(req.params.id, {
      include: [
        {
          model: Exercise,
          attributes: [
            'name',
            'muscle',
            'equipment',
            'instructions',
          ],
        },
      ],
    });

    const routine = dbRoutineData.get({ plain: true });
    res.render('make-routine', { routine });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
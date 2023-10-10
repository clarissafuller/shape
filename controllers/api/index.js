const router = require("express").Router();
const userRoutes = require("./userRoutes");
const exerciseRoutes = require("./exerciseRoutes.js");
const routineRoutes = require("./routineRoutes.js");
const routineExerciseRoutes = require("./routineExerciseRoutes.js");

router.use("/users", userRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/routines", routineRoutes);
router.use("/routineExercises", routineExerciseRoutes);

module.exports = router;

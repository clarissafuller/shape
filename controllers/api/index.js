const router = require("express").Router();
const userRoutes = require("./userRoutes");
const exerciseRoutes = require("./exerciseRoutes.js");
const routineRoutes = require("./routineRoutes.js");

router.use("/users", userRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/routines", routineRoutes);

module.exports = router;

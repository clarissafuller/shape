const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const routineRoutes = require("./routineRoutes");
const calendarRoutes = require("./calendarRoutes");
const makeRoutineRoutes = require("./make-routineRoutes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/routine", routineRoutes);
router.use("/calendar", calendarRoutes);
router.use("/make-route", makeRoutineRoutes);
router.use("/api", apiRoutes);

module.exports = router;

const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const routineRoutes = require("./routine");
const calendarRoutes = require("./calendar");
const makeRoutineRoutes = require("./make-routine");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/routine", routineRoutes);
router.use("/calendar", calendarRoutes);
router.use("/make-route", makeRoutineRoutes);
router.use("/api", apiRoutes);

module.exports = router;

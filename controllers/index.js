const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// root path
router.use("/", homeRoutes);

// api path
router.use("/api", apiRoutes);

module.exports = router;

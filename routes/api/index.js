const router = require("express").Router();
const userRoutes = require("./users");
const photoRoutes = require("./photos");
const resourceRoutes = require("./resources");
// Project routes
router.use("/users", userRoutes);
router.use("/photos", photoRoutes);
router.use("/resources", resourceRoutes);

module.exports = router;

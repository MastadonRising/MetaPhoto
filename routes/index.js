const router = require("express").Router();
const resourceRoutes = require("./routes");

// Book routes
router.use("/resources", resourceRoutes);

module.exports = router;

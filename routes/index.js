const router = require("express").Router();
const photoRoutes = require("./api/photos");
const resourcesRoutes = require("./api/resources");
const routesRoutes = require("./api/routes");
const resourcesController = require("../controllers/resourcesController");
const userController = require("../controllers/userController");

router.use("/photo", photoRoutes);
router.use("/api/resources", resourcesRoutes);
router.use("/routes", routesRoutes);

// router.route("/api/resources").get(resourcesController.findAll);

module.exports = router;

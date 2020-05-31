const router = require("express").Router();
const resourcesController = require("../../controllers/resourcesController");

router
  .route("/api/resources")
  .get(resourcesController.findAll)
  .post(resourcesController.create);
router
  .route("/api/resources:id")
  .put(resourcesController.update)
  .delete(resourcesController.remove);

module.exports = router;

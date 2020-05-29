const router = require("express").Router();
const photoController = require("../../controllers/photosController");

router
  .route("/api/photo")
  .get(photoController.findAll)
  .post(photoController.create);

router
  .route("/api/photo:id")
  .get(photoController.findAll)
  .put(photoController.update)
  .delete(photoController.remove);

module.exports = router;

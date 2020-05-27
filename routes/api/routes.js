const router = require("express").Router();
const routesController = require("../../controllers/routesController");

// Matches with "/api/books"
router.route("/routes").post(userController.createUser);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;

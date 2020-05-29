const router = require("express").Router();
const routesController = require("../../controllers/routesController");

// Matches with "/api/books"
<<<<<<< HEAD
router.route("/routes").post(userController.createUser);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

=======
// router.route("/routes").post(routesController.createroutes);

// Matches with "/api/books/:id"
router.route("/routes/api:id").get(routesController.findAll);
// .put(routesController.update)
// .delete(routesController.remove);
>>>>>>> Mastadon
module.exports = router;

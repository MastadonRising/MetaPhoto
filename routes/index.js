const router = require("express").Router();
const routesController = require("../controllers/routesController");
const resourcesController = require("../controllers/resourcesController");
const photoController = require("../controllers/photosController");
const userController = require("../controllers/userController");

router.route("/api/resources").get(resourcesController.findAll);

router
  .route("/api/photo")
  .get(photoController.findAll)
  .post(photoController.create);

router
  .route("/api/photo:id")
  .post(photoController.like)
  .get(photoController.findAll)
  .put(photoController.update)
  .delete(photoController.remove);

router
  .route("/api/resources")
  .get(resourcesController.findAll)
  .post(resourcesController.create);
router
  .route("/api/resources:id")
  .put(resourcesController.update)
  .delete(resourcesController.remove);

router
  .route("/routes/api:id")
  .get(routesController.findAll)
  .post(routesController.create);

router
  .route("/api/user")
  .get(userController.findAll)
  .post(userController.createUser);

router
  .route("/api/user:id")
  .get(userController.findById)
  .put(userController.updateUser)
  .delete(userController.removeUser);

router.route("/api/favorite:id").post(userController.addFavorite);

router.route("/login").post(userController.authenticate);
router.route("/register").post(userController.createUser);
router.route("/user").get(userController.getUser);

module.exports = router;

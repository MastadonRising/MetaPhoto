const router = require("express").Router();
const routesController = require("../controllers/routesController");
const resourcesController = require("../controllers/resourcesController");

// Matches with "/api/books"
// router.route("/routes").post(routesController.createroutes);

// Matches with "/api/books/:id"
router.route("/routes/api:id").get(routesController.findAll);
// .put(routesController.update)
// .delete(routesController.remove);

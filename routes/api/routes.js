const router = require("express").Router();
const routesController = require("../../controllers/routesController");

// Matches with "/api/books"
// router.route("/routes").post(routesController.createroutes);

// Matches with "/api/books/:id"
router.route("/routes/api:id").get(routesController.findAll);
// .put(routesController.update)
// .delete(routesController.remove);
module.exports = router;

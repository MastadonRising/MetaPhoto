const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutesSchema = new Schema({
  routeID: { type: String },
  name: { type: String, required: true },
  rating: { type: String, required: false },
  location: [],
  url: { type: String, required: false },
});

const Routes = mongoose.model("Routes", RoutesSchema);

module.exports = Routes;

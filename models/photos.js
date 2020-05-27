const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  url: { type: String, required: true },
  userID: { type: String, required: true },
  routeID: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;

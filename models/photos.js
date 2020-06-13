const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  // photoID: { type: String, required: true },
  url: { type: String, required: true },
  handle: { type: String, required: false },
  userID: { type: String, required: true },
  routeID: { type: String, required: false }, // url
  routes: [],
  exifdata: {},
  likes: [
    {
      typeOf: { type: String },
      userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  ],
  date: { type: Date, default: Date.now },
});

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;

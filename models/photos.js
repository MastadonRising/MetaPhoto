const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  photoID: { type: String, required: true },
  url: { type: String, required: true },
  userID: { type: String, required: true },
  routeID: { type: String, required: false },
  likes: [
    {
      likeID: { type: String, require: true },
      type: { type: String, require: true },
      userID: { type: String, require: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;

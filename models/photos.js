const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  // photoID: { type: String, required: true },
  url: { type: String, required: true },
  userID: { type: String, required: true },
  routeID: { type: String, required: false }, // url
  upLikes: { type: Number, default: 0 },
  downLikes: { type: Number, default: 0 },
  likes: [
    {
      // likeID: { type: String, require: true },
      typeOf: { Type: String },
      userID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  ],
  date: { type: Date, default: Date.now },
});

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;

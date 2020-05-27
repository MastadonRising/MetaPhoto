const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  photo: { type: String, required: true },
  desc: { type: String },
});

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;

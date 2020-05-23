const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  link: { type: String },
});

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;

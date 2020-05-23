const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  favorites: [
    {
      type: " ",
      Id: "",
    },
  ],
  hardestClimb: "",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

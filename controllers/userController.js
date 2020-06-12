const db = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Defining methods for the postsController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  updateUser: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  removeUser: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  addFavorite: function (req, res) {
    db.User.update({ _id: req.params.id }, { $push: { favorites: req.body } })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  removeFavorite: function (req, res) {
    let { favType, FavID } = req.body;
    db.User.update(
      { _id: req.params.id },
      { $pull: { favorites: { $elemMatch: { type: favType, Id: FavID } } } }
    )
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  authenticate: function (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;

      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;

          res.send(req.user);

          console.log(req.user);
        });
      }
    })(req, res, next);
  },

  createUser: function (req, res) {
    console.log("here is the shit you want to see", req.body);
    db.User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new db.User({
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  },
  getUser: function (req, res) {
    console.log("incoming" + JSON.stringify(req.user));
    db.User.findOne({ username: req.user.username }).then((data) => {
      res.send(data);
      console.log(data);
    });
  },
  logout: function (req, res) {
    req.logout();
<<<<<<< HEAD
    res.send(`/`);
=======
>>>>>>> 86d834492aa967f8b70bcdbe82ef91499d033f9e
  },
};

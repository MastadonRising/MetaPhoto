const db = require("../models");

// Defining methods for the postsController
module.exports = {
  findAll: function (Req, res) {
    db.Photos.find((username: user.username))
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByHandle: function ({ params }, res) {
    db.Photos.find(params)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("getting hit");

    // console.log(newImage)
    console.log(req.body);
    db.Photos.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  updateWithHandle: function (req, res) {
    db.Photos.findOneAndUpdate({ handle: req.params.handle }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Photos.update({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  like: function (req, res) {
    console.log(req.body);
    db.Photos.update({ _id: req.params.id }, { $push: { likes: req.body } })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Photos.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

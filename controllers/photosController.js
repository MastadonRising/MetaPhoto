const db = require("../models");

// Defining methods for the postsController
module.exports = {
  findAll: function (req, res) {
    db.Photos.find({})
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function ({ params }, res) {
    let id = params.id;
    db.Photos.find({ userID: id })
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

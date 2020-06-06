const db = require("../models");

// Defining methods for the postsController
module.exports = {
  findAll: function (req, res) {
    console.log(req);
    db.Photos.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("getting hit");
    console.log(req);
    let photo = {
      PhotoID: req.body.PhotoID,
      url: req.body.url,
      userID: req.User.id,
      routeID: req.body.routesID,
    };

    db.Photos.create(photo)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Photos.findOneAndUpdate({ _id: req.params.id }, req.body)
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

const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactMetaPhotodb"
);

const resourceSeed = [
  {
    _id: ObjectId("5edc264e94b7f74940f19c4c"),
    admin: false,
    username: "tacobob",
    firstName: "taco",
    lastName: "bob",
    email: "tb@tb.com",
    password: "$2a$10$6B2y1d6FOgSTCSou4ZnnGOV7GsYxNElWyV4ctjAqqsN7J.kOr03HK",
    favorites: [],
    createdAt: ISODate("2020-06-06T23:27:10.372Z"),
    updatedAt: ISODate("2020-06-13T21:53:07.567Z"),
    __v: 0,
    profile_photo: "https://cdn.filestackcontent.com/Y0Pfb3aSSEiJeMTlRaJx",
  },
];

db.Users.remove({})
  .then(() => db.User.collection.insertMany(resourceSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

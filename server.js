const express = require("express");
const path = require("path");
const logger = require(`morgan`);
const mongoose = require("mongoose");
const router = require("./routes/api/routes");
const compression = require(`compression`);
const PORT = process.env.PORT || 3001;
const app = express();
const resourcesController = require("./controllers/resourcesController");
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(compression());

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactMetaPhotodb",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(router);
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// let resources = [
//   {
//     name: "REI",
//     url: "https://www.rei.com/h/climbing",
//     photo: "https://satchel.rei.com/media/img/header/rei-co-op-logo-black.svg",
//     desc: "Great source of outdoor gear",
//   },
//   {
//     name: "Rock and Ice Climbing Terminology",
//     url: "https://rockandice.com/how-to-climb/climbing-terminology/",
//     photo:
//       "https://d1vs4ggwgd7mlq.cloudfront.net/wp-content/uploads/2017/09/HTC-1-e1506543271799-943x563.jpg",
//     desc: "Glossary of common rock climbing terms",
//   },
//   {
//     name: "CRAGS Climbing Resource Advocates for Greater Sacramento",
//     url: "https://norcalcrags.org/",
//     photo:
//       "https://scontent.fsac1-1.fna.fbcdn.net/v/t1.0-9/23561592_10156120267134467_3629986482978573633_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=chbTsgultYYAX8nR839&_nc_ht=scontent.fsac1-1.fna&oh=4dd80ab2dcea4a183633ffab4e50309b&oe=5EEF3233",
//     desc: "Glossary of common rock climbing terms",
//   },
// ];

// resources.forEach((resource) => {
//   let res = {};
//   resourcesController.createSeed(resource, res);
//   console.log(resource);
// });

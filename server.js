const express = require("express");
const path = require("path");
const logger = require(`morgan`);
// const mongoose = require("mongoose");
const compression = require(`compression`);
const PORT = process.env.PORT || 3001;
const app = express();

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

// Connect to the Mongo DB if being used
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/reactMetaPhotodb",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

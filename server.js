const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const logger = require(`morgan`);
const compression = require(`compression`);
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

const app = express();
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define middleware here
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);
app.use(logger("dev"));
app.use(compression());

app.use(routes);
// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactMetaPhotodb",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

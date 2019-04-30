const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// load routes
const users = require("./routes/users");

// passport config
require("./config/passport")(passport);

// db config
//const db = require("./config/keys").MongoURI;

// connect to mongoose
mongoose
  .connect("mongodb://localhost/propel", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//cors middleware
app.use(cors());

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware must be put after express session middleware
app.use(passport.initialize());
app.use(passport.session());

// handle browser back button cache
app.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

// use routes
app.use("/api/users", users);

const port = 4000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

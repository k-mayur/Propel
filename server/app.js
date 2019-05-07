const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require("multer");
const jwt_decode = require("jwt-decode");

const storage = multer.diskStorage({
  destination: "../public/uploads/",
  filename: function(req, file, cb) {
    const userObj = jwt_decode(req.headers.authorization);
    cb(null, file.fieldname + "-" + userObj.id + `.jpeg`);
  }
});

// init upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("profileImg");

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ message: "images only" });
  }
};

// load routes
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const userTasks = require("./routes/userTasks");

// passport config
require("./config/passport")(passport);

// db config
const db = require("./config/keys").MongoURI;

// connect to mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//cors middleware
app.use(cors());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("../public"));

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
app.use("/api/tasks", tasks);
app.use("/api/userTasks", userTasks);

app.post("/api/upload", function(req, res) {
  upload(req, res, err => {
    console.log(req.file, "here");
    if (req.file == undefined) {
      res.status(404).json({ errorMsg: "no file selected" });
    } else {
      if (err) {
        res.status(402).json({ errorMsg: err.message });
      } else {
        res
          .status(200)
          .json({ msg: "uploaded img", file: `uploads/${req.file.filename}` });
      }
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

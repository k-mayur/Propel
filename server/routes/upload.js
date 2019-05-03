const Busboy = require("busboy");
const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();
const jwt_decode = require("jwt-decode");

// load task model
require("../models/User");
const User = mongoose.model("users");

router.post("/", function(req, res, next) {
  const element1 = req.body.element1;

  busboy.on("finish", function() {
    console.log("Upload finished");

    // Your files are stored in req.files. In this case,
    // you only have one and it's req.files.element2:
    // This returns:
    // {
    //    element2: {
    //      data: ...contents of the file...,
    //      name: 'Example.jpg',
    //      encoding: '7bit',
    //      mimetype: 'image/png',
    //      truncated: false,
    //      size: 959480
    //    }
    // }

    // Grabs your file object from the request.
    const file = req.files.element2;
    console.log(file);

    // Begins the upload to the AWS S3
    //uploadToS3(file);
  });

  req.pipe(busboy);
});

module.exports = router;

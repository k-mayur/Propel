const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();
const jwt_decode = require("jwt-decode");

// load task model
require("../models/Task");
const Task = mongoose.model("tasks");

// get task
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      Task.find()
        .then(tasks => {
          res.status(200).json({
            tasks: tasks,
            errorMsg: null
          });
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    }
  }
);

// add task
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      const newTask = {
        task: req.body.task,
        createdBy: userObj.id,
        dueDate: req.body.dueDate
      };
      new Task(newTask)
        .save()
        .then(task => {
          res.status(201).json({
            task: task,
            errorMsg: null
          });
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    }
  }
);

// edit task
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      Task.findOne({
        _id: req.params.id
      }).then(task => {
        if (!task) {
          res.status(204).json({
            errorMsg: "No Task Found"
          });
        }
        // new values
        task.task = req.body.task;
        task.dueDate = req.body.dueDate;
        task.updatedDate = Date.now;
        task
          .save()
          .then(task => {
            res.status(200).json(task);
          })
          .catch(err => res.status(500).json({ errorMsg: err.message }));
      });
    }
  }
);

// delete task
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      Task.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ msg: "deleted" });
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    }
  }
);

module.exports = router;

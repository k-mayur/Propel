const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();
const jwt_decode = require("jwt-decode");

// Load input validation
const validateTaskInput = require("../validation/tasks");
// load task model
require("../models/Task");
const Task = mongoose.model("tasks");

// get task
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = jwt_decode(req.headers.authorization);
    Task.find()
      .then(tasks => {
        res.status(200).json({
          tasks: tasks
        });
      })
      .catch(err => console.log(err));
  }
);

// add task
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newTask = {
      task: req.body.task,
      createdBy: req.body.createdBy,
      dueDate: req.body.dueDate
    };
    new Task(newTask)
      .save()
      .then(task => {
        res.status(200).json(task);
      })
      .catch(err => console.log(err));
  }
);

// edit task process
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({
      _id: req.params.id
    }).then(task => {
      // new values
      task.task = req.body.task;
      task.dueDate = req.body.dueDate;
      task.updatedDate = Date.now;
      task
        .save()
        .then(task => {
          res.status(200).json(task);
        })
        .catch(err => console.log(err));
    });
  }
);

// delete task
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ msg: "deleted" });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;

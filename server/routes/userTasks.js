const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();

// Load input validation
const validateUserTaskInput = require("../validation/userTasks");
// load task model
require("../models/Task");
require("../models/User");
const Task = mongoose.model("tasks");
const User = mongoose.model("users");

// get task
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.body.id })
      .then(user => {
        res.status(200).json(user.tasks);
      })
      .catch(err => console.log(err));
  }
);

// get trainees
router.get(
  "/trainee",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ userType: "TRAINEE" })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => console.log(err));
  }
);

// get mentors
router.get(
  "/mentor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ userType: "MENTOR" })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => console.log(err));
  }
);

// assign task
router.put(
  "/assign",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ _id: req.body.taskId }).then(task => {
      const newTask = {
        task: task.task,
        dueDate: task.dueDate,
        status: "NYS",
        assignedBy: req.body.mentorId
      };
      User.findOne({ _id: req.body.traineeId }).then(trainee => {
        const newTasks = trainee.tasks.concat(newTask);
        trainee.tasks = newTasks;
        trainee
          .save()
          .then(trainee => {
            res.status(200).json(trainee);
          })
          .catch(err => console.log(err));
      });
    });
  }
);

// update user task
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({
      _id: req.body.traineeId
    }).then(user => {
      user.tasks[req.body.index].status = req.body.status;
      user
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => console.log(err));
    });
  }
);

// delete user task
router.put(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.body.traineeId }).then(user => {
      //delete task logic

      user
        .save()
        .then(() => {
          res.status(200).json({ msg: "deleted" });
        })
        .catch(err => console.log(err));
    });
  }
);

module.exports = router;

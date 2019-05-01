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
        assignedBy: req.body.mentorId,
        id: mongoose.Types.ObjectId()
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
    }).then(async user => {
      const newtask = function(user) {
        const newTasks = Object.assign([], user.tasks);
        const updatedTasks = newTasks.map(task => {
          if (task !== null) {
            if (task.id == req.body.taskId) {
              task.status = req.body.status;
            }
            return task;
          } else {
            return;
          }
        });
        console.log(updatedTasks, "up");
        return updatedTasks;
      };
      const savetask = function(user) {
        console.log(user.tasks, "save");
        user.markModified("tasks");
        user
          .save()
          .then(user => {
            res.status(200).json(user);
          })
          .catch(err => console.log(err));
      };
      user.tasks = await newtask(user);

      await savetask(user);
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
      const newTasks = Object.assign([], user.tasks);
      const updatedTasks = newTasks.map(task => {
        if (task !== null) {
          if (task.id == req.body.taskId) {
            return;
          } else {
            return task;
          }
        } else {
          return;
        }
      });
      user.tasks = updatedTasks;
      user.markModified("tasks");
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

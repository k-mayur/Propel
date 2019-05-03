const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();
const jwt_decode = require("jwt-decode");

// Load input validation
const validateUserTaskInput = require("../validation/userTasks");
// load task model
require("../models/Task");
require("../models/User");
const Task = mongoose.model("tasks");
const User = mongoose.model("users");

// get tasks
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.id })
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
    const userObj = jwt_decode(req.headers.authorization);
    Task.findOne({ _id: req.body.taskId }).then(task => {
      const newTask = {
        task: task.task,
        dueDate: task.dueDate,
        status: "NYS",
        assignedBy: userObj.name,
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

// add tasks by trainee
router.post("/add", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    User.findOne({ _id: userObj.id })
      .then(user => {
        let newTask = {
          task: req.body.task,
          assignedBy: req.body.trainee,
          dueDate: new Date(req.body.dueDate),
          status: "NYS",
          id: mongoose.Types.ObjectId()
        }
        user.tasks.push(newTask);
        user.markModified('tasks');
        user
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
)

// update user task
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    User.findOne({
      _id: userObj.id
    }).then(user => {
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
      user.tasks = updatedTasks;
      user.markModified('tasks');
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
    const userObj = jwt_decode(req.headers.authorization);
    User.findOne({ _id: userObj.id }).then(user => {
      //delete task logic
      const newTasks = Object.assign([], user.tasks);
      const updatedTasks = newTasks
        .map(task => {
          if (task !== null) {
            if (task.id == req.body.taskId) {
              return;
            } else {
              return task;
            }
          } else {
            return;
          }
        })
        .filter(task => {
          return task != null;
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

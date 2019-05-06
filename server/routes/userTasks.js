const express = require("express");
const mongoose = require("mongoose");
var passport = require("passport");
const router = express.Router();
const jwt_decode = require("jwt-decode");

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
        if (!user) {
          res.status(204).json({
            errorMsg: "Not Found"
          });
        }
        res.status(200).json({
          tasks: user.tasks,
          errorMsg: null
        });
      })
      .catch(err => res.status(500).json({ errorMsg: err.message }));
  }
);

// get user
router.get(
  "/users/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);

    User.findOne({ _id: userObj.id })
      .then(user => {
        res.status(200).json({
          user: user,
          errorMsg: null
        });
      })
      .catch(err => {
        res.status(500).json({ errorMsg: err.message });
      });
  }
);

// get trainees
router.get(
  "/users/trainee",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      User.find({ userType: "TRAINEE" })
        .then(users => {
          res.status(200).json({
            users: users,
            errorMsg: null
          });
        })
        .catch(err => {
          res.status(500).json({ errorMsg: err.message });
        });
    }
  }
);

// get mentors
router.get(
  "/users/mentor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      User.find({ userType: "MENTOR" })
        .then(users => {
          res.status(200).json({
            users: users,
            errorMsg: null
          });
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    }
  }
);

// assign task by self
router.put(
  "/task/assignme",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "TRAINEE") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
      const newTask = {
        task: req.body.task,
        dueDate: req.body.dueDate,
        status: "NYS",
        assignedBy: userObj.name,
        id: mongoose.Types.ObjectId()
      };
      User.findOne({ _id: userObj.id }).then(trainee => {
        const newTasks = trainee.tasks.concat(newTask);
        trainee.tasks = newTasks;
        trainee
          .save()
          .then(trainee => {
            res.status(200).json({
              trainee: trainee,
              errorMsg: null
            });
          })
          .catch(err => res.status(500).json({ errorMsg: err.message }));
      });
    }
  }
);

// assign task by mentor
router.put(
  "/task/assign",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    if (userObj.userType !== "MENTOR") {
      res.status(403).json({ errorMsg: "Not authorized" });
    } else {
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
              res.status(200).json({
                trainee: trainee,
                errorMsg: null
              });
            })
            .catch(err => res.status(500).json({ errorMsg: err.message }));
        });
      });
    }
  }
);

// add tasks by trainee
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
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
        };
        user.tasks.push(newTask);
        user.markModified("tasks");
        user
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

// update user task
router.put(
  "/task/update",
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
      user.markModified("tasks");
      user
        .save()
        .then(user => {
          res.status(200).json({
            user: user,
            errorMsg: null
          });
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    });
  }
);

// delete user task
router.put(
  "/delete/:taskId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    User.findOne({ _id: userObj.id }).then(user => {
      //delete task logic
      const newTasks = Object.assign([], user.tasks);
      const updatedTasks = newTasks
        .map(task => {
          if (task !== null) {
            if (task.id == req.params.taskId) {
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
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    });
  }
);

router.put(
  "/mentor/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);
    User.findOne({ _id: req.body.traineeId }).then(user => {
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
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    });
  }
);

//edit user
router.put(
  "/user/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userObj = jwt_decode(req.headers.authorization);

    User.findOne({
      _id: userObj.id
    }).then(user => {
      // new values
      user.name = req.body.name;
      user.about = req.body.about;
      user.updatedDate = Date.now;
      user
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ errorMsg: err.message }));
    });
  }
);

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
<<<<<<< HEAD
  tasks:{
    type:Array,
    default:[]
=======
  tasks: {
    type: Array,
    default: []
>>>>>>> dev
  }
});

mongoose.model("users", UserSchema);
module.exports = UserSchema;

const mongoose = require("mongoose");
const { UserSchema } = require("./User");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = { TaskModel, TaskSchema };

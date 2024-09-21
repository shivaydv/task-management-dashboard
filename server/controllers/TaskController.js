const { TaskModel } = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const { user } = req.body;
    const tasks = await TaskModel.find({ user });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const addTask = async (req, res) => {
  const { title, description, status, priority, dueDate, user } = req.body;

  try {
    const newTask = new TaskModel({
      title,
      description,
      status,
      priority,
      dueDate,
      user,
    });

    await newTask.save();
    res.json({
      success: true,
      message: "Great! Task added successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteTask = async (req, res) => {
  const { _id } = req.body;

  try {
    const result = await TaskModel.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { _id, title, description, status, priority, dueDate } = req.body;

  // Validate request body
  if (!_id) {
    return res.status(400).json({
      success: false,
      message: "Task ID is required",
    });
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(_id, {
      title,
      description,
      status,
      priority,
      dueDate,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getAllTasks, addTask, deleteTask, updateTask };

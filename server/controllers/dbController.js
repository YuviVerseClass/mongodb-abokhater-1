const Task = require('../models/Task');

async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function addTask(req, res) {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};

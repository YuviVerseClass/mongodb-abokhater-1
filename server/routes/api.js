// Require express and create a router
const express = require("express");
const router = express.Router();

// Require your controller
const db = require("../controllers/dbController");

// Wire each of the following routes to its controller method:
router.get("/tasks", db.getTasks);
router.post("/tasks", db.addTask);
router.patch("/tasks/:id", db.toggleTask);
router.delete("/tasks/:id", db.deleteTask);

// Export the router
module.exports = router;

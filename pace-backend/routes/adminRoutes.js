import express from "express";
import { authenticate, checkAdminRole } from "../middlewares/authMiddleware.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controller/taskController.js";
const router = express.Router();

//Task management
router.get("/task/all", authenticate, checkAdminRole, getAllTasks);
router.get("/task/:taskId", authenticate, checkAdminRole, getTask);
router.post("/task/add", authenticate, checkAdminRole, addTask);
router.patch("/task/update/:taskId", authenticate, checkAdminRole, updateTask);
router.delete("/task/delete/:taskId", authenticate, checkAdminRole, deleteTask);

//sample route
router.get("/dash", authenticate, checkAdminRole, (req, res) => {
  console.log(req.user);
  res.json({ message: "admin accessed" });
});

export default router;

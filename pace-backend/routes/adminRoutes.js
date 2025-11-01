import express from "express";
import { authenticate, checkAdminRole } from "../middlewares/authMiddleware.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controller/taskController.js";
import {
  allNonApprovedStudents,
  toggleApproval,
} from "../controller/studentController.js";
import {
  addFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getByTimeFrame,
  getFeedback,
  updateFeedback,
} from "../controller/feedbackController.js";
import { toogleAttendanceStatus } from "../controller/attendanceController.js";
const router = express.Router();

//Task management
router.get("/task/all", authenticate, checkAdminRole, getAllTasks);
router.get("/task/:taskId", authenticate, checkAdminRole, getTask);
router.post("/task/add", authenticate, checkAdminRole, addTask);
router.patch("/task/update/:taskId", authenticate, checkAdminRole, updateTask);
router.delete("/task/delete/:taskId", authenticate, checkAdminRole, deleteTask);

//Student Management
router.post(
  "/student/approve/toggle/:studentId",
  authenticate,
  checkAdminRole,
  toggleApproval
);
router.get(
  "/student/nonapproved",
  authenticate,
  checkAdminRole,
  allNonApprovedStudents
);

//Feedback management
router.post("/feedback/add", authenticate, checkAdminRole, addFeedback);
router.patch(
  "/feedback/update/:feedbackId",
  authenticate,
  checkAdminRole,
  updateFeedback
);
router.get("/feedback/all", authenticate, checkAdminRole, getAllFeedbacks);
router.get("/feedback/timeframe", authenticate, checkAdminRole, getByTimeFrame);
router.get("/feedback/:feedbackId", authenticate, checkAdminRole, getFeedback);
router.delete(
  "/feedback/delete/:feedbackId",
  authenticate,
  checkAdminRole,
  deleteFeedback
);

//Attendance route
router.post(
  "/attendance/toggle",
  authenticate,
  checkAdminRole,
  toogleAttendanceStatus
);

//sample route
router.get("/dash", authenticate, checkAdminRole, (req, res) => {
  console.log(req.user);
  res.json({ message: "admin accessed" });
});

export default router;

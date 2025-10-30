import { validateMongoId } from "../helpers/validateMongoId.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import Attendance from "../models/attendanceModel.js";

export const toogleAttendanceStatus = asyncHandler(async (req, res) => {
  const { studentId, taskId } = req.body;
  const markedBy = req.user.id;

  if (!studentId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Student ID is required" });
  }
  if (!validateMongoId(studentId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid student ID" });
  }
  if (!taskId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Task ID is required" });
  }
  if (!validateMongoId(taskId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid task ID" });
  }
  if (!markedBy) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "markedBy is required" });
  }
  if (!validateMongoId(markedBy)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid markedBy ID" });
  }

  const existingAttendance = await Attendance.findOne({
    studentId,
    taskId,
    markedBy,
  });
  if (existingAttendance) {
    existingAttendance.status = !existingAttendance.status;
    await existingAttendance.save();
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Attendance toggled", attendance: existingAttendance });
  }

  const attendance = await Attendance.create({
    studentId,
    taskId,
    markedBy,
    status: true,
  });
  if (!attendance) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Attendance not created" });
  }
  res
    .status(HTTP_STATUS.OK)
    .json({ message: "Attendance created", attendance });
});

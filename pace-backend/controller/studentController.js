import { validateMongoId } from "../helpers/validateMongoId.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";

export const toggleApproval = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

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

  const student = await User.findById({ _id: studentId });

  if (!student) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Student not found" });
  }

  student.isApproved = !student.isApproved;
  await student.save();
  res.status(HTTP_STATUS.OK).json({ message: "User updated successfully", student });
});

export const allNonApprovedStudents = asyncHandler(async (req, res) => {
  const nonApprovedStudents = await User.find({ isApproved: false });

  if (!nonApprovedStudents) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Non approved students not found" });
  }

  if(nonApprovedStudents.length === 0) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "No non approved students found" , nonApprovedStudents});
  }

  res
    .status(HTTP_STATUS.OK)
    .json({ message: "Non approved students", nonApprovedStudents });
});

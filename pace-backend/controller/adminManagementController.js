import asyncHandler from "../middlewares/asyncHandler.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import User from "../models/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isApproved: true, role: "student" });
  if (!users) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Users not found" });
  }
  if (!users.length) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Users not found" });
  }

  res.status(HTTP_STATUS.OK).json({ message: "users found", users });
});


export const getSenior = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'seniorCordinator' });
  if (!users) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Users not found" });
  }
  if (!users.length) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Users not found" });
  }

  res.status(HTTP_STATUS.OK).json({ message: "users found", users });
});

import mongoose from "mongoose";
import { validateMongoId } from "../helpers/validateMongoId.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Feedback } from "../models/feedbackModel.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import { charNumberRegex } from "../validators/validators.js";

export const addFeedback = asyncHandler(async (req, res) => {
  let { taskId, studentId, givenBy, feedback } = req.body;

  if (!validateMongoId(taskId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid taskId" });
  }
  if (!validateMongoId(studentId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid studentId" });
  }
  if (!validateMongoId(givenBy)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid givenBy ID" });
  }
  if (!feedback) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Feedback is required" });
  }
  feedback = feedback.trim();
  if (!charNumberRegex.test(feedback)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Feedback should only contain letters, numbers, spaces, and basic punctuation",
    });
  }

  //check weather feedback already given
  const isExist = await Feedback.findOne({ studentId, taskId });

  if (isExist) {
    return res
      .status(HTTP_STATUS.CONFLICT)
      .json({ message: "Feedback already given", feedback: isExist });
  }

  const newFeedBack = {
    taskId,
    studentId,
    givenBy,
    feedback,
  };

  const newFeedback = await Feedback.create(newFeedBack);
  if (!newFeedback) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Error in creating feedback" });
  }

  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: "Feedback added successfully", newFeedback });
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  let givenBy = req.user.id;
  givenBy = new mongoose.Types.ObjectId(givenBy);

  if (!feedbackId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Feedback ID is required" });
  }
  if (!validateMongoId(feedbackId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid feedbackId" });
  }

  let { feedback } = req.body;
  if (!feedback) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Feedback is required" });
  }

  feedback = feedback.trim();
  if (!charNumberRegex.test(feedback)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Feedback should only contain letters, numbers, spaces, and basic punctuation",
    });
  }

  //Validate if the admin can modify the feedback
  const valicateGivenBy = await Feedback.findOne({ _id: feedbackId });
  if (!valicateGivenBy) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }
  if (!valicateGivenBy.givenBy.equals(givenBy)) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "You can't update this feedback" });
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    { feedback },
    { new: true, runValidators: true }
  );

  if (!updatedFeedback) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }
  res
    .status(HTTP_STATUS.OK)
    .json({ message: "Feedback updated successfully", updatedFeedback });
});

export const getFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  if (!feedbackId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Task ID is required" });
  }
  if (!validateMongoId(feedbackId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid feedbackId" });
  }
  const feedback = await Feedback.findOne({ _id: feedbackId });
  if (!feedback) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }
  if (feedback.length === 0) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "No feedback found", feedback });
  }
  res.status(HTTP_STATUS.OK).json({ message: "Feedback found", feedback });
});

export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find();
  if (!feedback) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }
  if (feedback.length === 0) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "No feedback found", feedback });
  }
  res.status(HTTP_STATUS.OK).json({ message: "Feedback found", feedback });
});

export const getByTimeFrame = asyncHandler(async (req, res) => {
  let { startTime, endTime } = req.query;

  if (!startTime) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Start time is required" });
  }
  if (!endTime) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "End time is required" });
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  const feedback = await Feedback.find({
    createdAt: { $gte: startTime, $lte: endTime },
  });
  if (!feedback) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }
  if (feedback.length === 0) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "No feedback found", feedback });
  }
  res.status(HTTP_STATUS.OK).json({ message: "Feedback found", feedback });
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  if (!feedbackId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Feedback ID is required" });
  }
  if (!validateMongoId(feedbackId)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid feedbackId" });
  }

  const feedback = await Feedback.findByIdAndDelete(feedbackId);
  if (!feedback) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Feedback not found" });
  }

  // res.status(HTTP_STATUS.NO_CONTENT).send();
  res.status(HTTP_STATUS.OK).json({ message: "Feedback deleted successfully" });
});

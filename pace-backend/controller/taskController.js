import asyncHandler from "../middlewares/asyncHandler.js";
import Task from "../models/taskModel.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";

export const addTask = asyncHandler(async (req, res) => {
  const { activity, description, conductedBy } = req.body;
  const assignedBy = req.user.id;

  if (!activity) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Activity is required" });
  }
  if (!description) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Description is required" });
  }

  if (!conductedBy) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Conducted By is required" });
  }

  if (conductedBy.length === 0) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Conducted By is required" });
  }

  const newTask = {
    activity,
    description,
    assignedBy,
    conductedBy,
  };

  const task = await Task.create(newTask);

  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: "task created successfully", task });
});

export const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Task ID is required" });
  }
  const task = await Task.findById(taskId);

  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Task not found" });
  }
  res.status(HTTP_STATUS.OK).json({ message: "task found", task });
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Tasks not found" });
  }
  res.status(HTTP_STATUS.OK).json({ message: "tasks found", tasks });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { activity, description, conductedBy } = req.body;
  const assignedBy = req.user.id;

  if (!activity) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Activity is required" });
  }
  if (!description) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Description is required" });
  }

  if (!conductedBy) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Conducted By is required" });
  }

  if (conductedBy.length === 0) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Conducted By is required" });
  }

  const newData = {
    activity,
    description,
    assignedBy,
    conductedBy,
  };

  const task = await Task.findByIdAndUpdate(taskId, newData, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Task not found" });
  }

  res
    .status(HTTP_STATUS.OK)
    .json({ message: "Task updated successfully", task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Task ID is required" });
  }
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Task not found" });
  }

  // res.status(HTTP_STATUS.NO_CONTENT).send();
  res.status(HTTP_STATUS.OK).json({ message: "task deleted successfully" });
});

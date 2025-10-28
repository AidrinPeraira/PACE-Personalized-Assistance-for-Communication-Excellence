import mongoose from "mongoose";

export const validateMongoId = (mongoId) => {
  return mongoose.Types.ObjectId.isValid(mongoId);
};

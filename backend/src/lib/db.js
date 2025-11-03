import mongoose from "mongoose";

export const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("error while connecting with database", error.message);
  }
};

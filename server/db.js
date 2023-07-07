import { connect } from "mongoose";
import { MONGODB_URL } from "./config.js";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URL);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error(error);
  }
};

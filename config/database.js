import mongoose from "mongoose";


const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
  process.env;
const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB; 
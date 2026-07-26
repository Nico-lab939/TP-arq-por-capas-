import mongoose from "mongoose";


const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
  process.env;
//const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;
<<<<<<< HEAD
const MONGODB_URI = 
=======
const MONGODB_URI ="mongodb://ntesiowork_db_user:pW5CK7CdynI5nxsY@ac-prihn8c-shard-00-00.4ppooky.mongodb.net:27017,ac-prihn8c-shard-00-01.4ppooky.mongodb.net:27017,ac-prihn8c-shard-00-02.4ppooky.mongodb.net:27017/Base_Dogs?ssl=true&replicaSet=atlas-en2p3p-shard-0&authSource=admin&appName=Cluster0" 
>>>>>>> 366dd4c1adad148818f9dab968ecac18e4e9ea8e
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
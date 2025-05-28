import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "ScandiFans",
      })
      .then(() => {
        console.log("Mongodb connected successfully");
      })
      .catch((err) => {
        console.log(`Mongodb connection error: ${err}`);
      });
  } catch (error) {
    console.log(`Failed to connect db`);
  }
};

export default dbConnect;

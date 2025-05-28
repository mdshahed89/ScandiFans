// import mongoose from "mongoose";

// const dbConnect = async () => {
//   try {
//     await mongoose
//       .connect(process.env.MONGODB_URI, {
//         dbName: "ScandiFans",
//       })
//       .then(() => {
//         console.log("Mongodb connected successfully");
//       })
//       .catch((err) => {
//         console.log(`Mongodb connection error: ${err}`);
//       });
//   } catch (error) {
//     console.log(`Failed to connect db`);
//   }
// };

// export default dbConnect;

import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  const uri =
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URI
        : "mongodb+srv://RealEstate:RealEstate@realestate.n8dpbzv.mongodb.net/ScandiFans?retryWrites=true&w=majority&appName=RealEstate";

    // console.log(uri)
    

  try {
    const db = await mongoose.connect(
      uri,
      {
        dbName: "ScandiFans",
        serverSelectionTimeoutMS: 10000,
      }
    );

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw new Error("Failed to connect to database");
  }
};

export default dbConnect;

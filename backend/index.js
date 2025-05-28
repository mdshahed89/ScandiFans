import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./utils/dbConnect.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import Stripe from "stripe";

const app = express();
dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dbConnect();
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 7001;

// if (process.env.NODE_ENV !== "production") {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// }

export default app;

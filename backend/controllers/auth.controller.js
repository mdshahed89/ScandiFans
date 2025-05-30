import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { calculateRemainingPlanDays } from "../utils/util.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await User.create({ email, password });

    const token = generateToken(user._id);

    const { password: _, ...userData } = user._doc;

    res.status(201).send({ success: true, user: userData, token });
  } catch (error) {
    res.status(500).send({ error: "Server error", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    const { password: _, ...userData } = user._doc;

    res.status(200).send({ success: true, user: userData, token });
  } catch (error) {
    res.status(500).send({ error: "Server error", details: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const { userId } = req.params;

  // console.log("hello");
  

  try {
    const user = await User.findById(userId).select(
      "-password -paymentIntentId"
    );

    // console.log(userId);
    

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const remainingDays = calculateRemainingPlanDays(user);

    if (user.isPlanActive && remainingDays === 0) {
      user.isPlanActive = false;
      user.planDuration = 0;
      await user.save();
    }

    // return res.status(200).send({
    //   success: true,
    //   user,
    //   remainingDays,
    // });

    const userObj = user.toObject();
    userObj.remainingDays = remainingDays;

    return res.status(200).send({
      success: true,
      user: userObj,
    });

  } catch (error) {
    return res.status(500).send({
      error: "Server error",
      details: error.message,
    });
  }
};

import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Valid userId is required",
    });
  }

  try {

    const user = await User.findById(userId).select(
      "-email -password -isPlanActive -planDuration -paymentIntentId"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User fetched successfully!!",
      user,
    });
    

  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server error.", error: error.message });
  }
};

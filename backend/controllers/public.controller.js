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

export const incrementProfileView = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { view: 1 } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // console.log(updatedUser);

    res.status(200).send({
      success: true,
      message: "View count incremented",
      view: updatedUser.view,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error incrementing view", error });
  }
};

export const incrementProfileReact = async (req, res) => {

  const { id, userId } = req.params;

  // console.log("id");

    if (!id || !userId) {
    return res.status(400).send({
      success: false,
      message: "Both 'id' and 'userId' are required.",
    });
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      success: false,
      message: "Invalid MongoDB ID format for 'id' or 'userId'.",
    });
  }
  

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    if (user.reactedUsers.includes(id)) {
      return res.status(200).send({
        success: false,
        message: "User already reacted",
        react: user.react,
      });
    }

    user.react += 1;
    user.reactedUsers.push(id);
    await user.save();

    // console.log(user);

    return res.status(200).send({
      success: true,
      message: "React count incremented",
      react: user.react,
    })

  } catch (error) {

    res.status(500).send({
      success: false,
      message: "Error incrementing react",
      error: error.message,
    });

  }
};

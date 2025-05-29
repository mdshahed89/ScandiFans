import { stripe } from "../index.js";
import User from "../models/user.model.js";

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const { userId } = req.params;
  console.log(userId);

  try {
    if (!amount) {
      return res.status(400).send({
        success: false,
        message: "Amount is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Something went wrong",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "nok",
      payment_method_types: ["card"],
      capture_method: "automatic",
      transfer_group: `user_${userId}`,
    });

    console.log("createintent", paymentIntent.id);
    user.paymentIntentId = paymentIntent.id;

    await user.save();

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.log("Error in createPaymentIntent controller: ", error);
    res.status(500).send({
      success: false,
      message: "Server error when creating payment intent",
    });
  }
};

export const confirmPayment = async (req, res) => {
  const { paymentIntentId, planDuration } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Something went wrong",
      });
    }

    if (user.paymentIntentId !== paymentIntentId) {
      return res.status(400).send({
        success: false,
        message: "Succedd payment is not yours",
      });
    }

    user.isPlanActive = true;
    // user.planDuration = Number(planDuration);
    user.planDuration = (user.planDuration || 0) + Number(planDuration);
    user.planStartDate = new Date();

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Payment confirmed successfully!!",
      user,
    });
  } catch (error) {
    console.log("Error in createPaymentIntent controller: ", error);
    res.status(500).send({
      success: false,
      message: "Server error when confirming payment intent",
    });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const {
    description,
    profileImg,
    userName,
    name,
    identity,
    age,
    nationality,
    onlyFansInfo,
  } = req.body;

  // const defaultProfileImg =
  //   "https://res.cloudinary.com/ddlwhkn3b/image/upload/v1748289152/SIDESONE/blank-profile-picture-973460_960_720-removebg-preview_nzqjpg.png";

  // console.log(onlyFansInfo);

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    if (description !== undefined && description !== null && description !== "")
      user.description = description;

    if (onlyFansInfo && typeof onlyFansInfo === "object") {
      if (
        onlyFansInfo.video !== undefined &&
        onlyFansInfo.video !== null &&
        onlyFansInfo.video !== ""
      ) {
        user.onlyFansInfo.video = Number(onlyFansInfo.video);
      }
      if (
        onlyFansInfo.img !== undefined &&
        onlyFansInfo.img !== null &&
        onlyFansInfo.img !== ""
      ) {
        user.onlyFansInfo.img = Number(onlyFansInfo.img);
      }
      if (
        onlyFansInfo.react !== undefined &&
        onlyFansInfo.react !== null &&
        onlyFansInfo.react !== ""
      ) {
        user.onlyFansInfo.react = Number(onlyFansInfo.react);
      }

      if (
        onlyFansInfo.imgs !== undefined &&
        onlyFansInfo.imgs !== null &&
        Array.isArray(onlyFansInfo.imgs)
      ) {
        user.onlyFansInfo.imgs = onlyFansInfo.imgs;
      }

      if (
        onlyFansInfo.videos !== undefined &&
        onlyFansInfo.videos !== null &&
        typeof onlyFansInfo.videos === "string" &&
        onlyFansInfo.videos !== ""
      ) {
        user.onlyFansInfo.videos = onlyFansInfo.videos;
      }
    }

    // console.log(onlyFansInfo);

    // console.log(profileImg);

    // if (
    //   profileImg === undefined ||
    //   profileImg === null ||
    //   profileImg.trim() === ""
    // ) {
    //   user.profileImg = profileImg;
    // } else {
    //   user.profileImg = defaultProfileImg;
    // }

    if (profileImg && profileImg.trim() !== "") {
      user.profileImg = profileImg;
    }

    if (userName !== undefined && userName !== null && userName !== "")
      user.userName = userName;

    if (name !== undefined && name !== null && name !== "") user.name = name;

    if (
      identity !== undefined &&
      identity !== null &&
      identity !== "" &&
      identity !== "Select Identity"
    )
      user.identity = identity;

    if (typeof age === "number" && !isNaN(age)) user.age = age;

    // console.log(age);

    if (
      nationality !== undefined &&
      nationality !== null &&
      nationality !== "" &&
      nationality !== "Select Nationality"
    )
      user.nationality = nationality;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { password, newEmail, confirmEmail } = req.body;
    const userId = req.params.userId;

    if (req.user?.id.toString() !== req.params.userId) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized: You can only modify your own account",
      });
    }

    if (!password || !newEmail || !confirmEmail) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required." });
    }

    if (newEmail !== confirmEmail) {
      return res
        .status(400)
        .send({ success: false, message: "Emails do not match." });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found." });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect password." });
    }

    user.email = newEmail;
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Email updated successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Server error.", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.userId;

    if (req.user?.id.toString() !== req.params.userId) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized: You can only modify your own account",
      });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Passwords do not match." });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found." });

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect current password." });
    }

    user.password = newPassword;
    await user.save(); // triggers pre-save hook for hashing

    res
      .status(200)
      .send({ success: true, message: "Password updated successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Server error.", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};

    const excludedNationalities = [
      "Norway",
      "Sweden",
      "Denmark",
      "Finland",
      "Iceland",
    ];

    if (
      req.query.nationality &&
      req.query.nationality !== "Other" &&
      req.query.nationality !== "View All"
    ) {
      filter.nationality = req.query.nationality;
    } else if (req.query.nationality === "Other") {
      filter.nationality = { $nin: excludedNationalities };
    }

    if (req.query.identity) {
      const identities = Array.isArray(req.query.identity)
        ? req.query.identity
        : [req.query.identity];

      const validIdentities = identities.filter((i) => i !== "Other");

      if (validIdentities.length > 0) {
        filter.identity = { $in: validIdentities };
      }
    }

    const minAgeRaw = req.query.minAge;
    const maxAgeRaw = req.query.maxAge;

    const minAge =
      minAgeRaw !== undefined && minAgeRaw !== null && minAgeRaw !== ""
        ? parseInt(minAgeRaw)
        : NaN;
    const maxAge =
      maxAgeRaw !== undefined && maxAgeRaw !== null && maxAgeRaw !== ""
        ? parseInt(maxAgeRaw)
        : NaN;

    if (!isNaN(minAge) || !isNaN(maxAge)) {
      const ageConditions = {};
      if (!isNaN(minAge)) ageConditions.$gte = minAge;
      if (!isNaN(maxAge)) ageConditions.$lte = maxAge;

      filter.$or = [
        { age: ageConditions },
        { age: { $exists: false } },
        { age: null },
      ];
    }

    const search = req.query.search;
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { userName: { $regex: searchRegex } },
          { name: { $regex: searchRegex } },
        ],
      });
    }

    console.log(req.query);
    

    const totalUsers = await User.countDocuments(filter);

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ isPlanActive: -1, createdAt: -1 });

    return res.status(200).send({
      success: true,
      data: users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

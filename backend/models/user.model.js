import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    onlyFansInfo: {
      video: {
        type: Number,
        default: 0
      },
      img: {
        type: Number,
        default: 0
      },
      react: {
        type: Number,
        default: 0
      },
    },
    isPlanActive: {
      type: Boolean,
      default: false,
    },
    paymentIntentId: {
      type: String,
    },
    planDuration: {
      type: Number,
      default: 0,
    },
    identity: {
      type: String,
    },
    age: {
      type: Number,
    },
    nationality: {
      type: String,
    },
    profileImg: {
      type: String,
      default: "https://res.cloudinary.com/ddlwhkn3b/image/upload/v1748289152/SIDESONE/blank-profile-picture-973460_960_720-removebg-preview_nzqjpg.png"
    },
    description: {
      type: String,
    },
    view: {
      type: Number,
      default: 0
    },
    react: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

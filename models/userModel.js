import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoError } from "../utils/apiError.js";
import logger from "../config/logging.js";

const roles = ["user", "admin"];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // // Only run this function if password was moddified (not on other update functions)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.isPasswordSame = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.transform = function () {
  const userData = {};
  const fields = ["id", "name", "email", "role"];
  fields.forEach((field) => {
    userData[field] = this[field];
  });
  return userData;
};

userSchema.post("save", async function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    throw new MongoError("email already exists");
  } else {
    logger.error(error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

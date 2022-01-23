import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
  fullName: {
    type: String,
    required: [true, "fullName not provided"],
  },
  email: {
    type: String,
    required: [true, "email already exists"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "specify your role"],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.statics.isEmailTaken = async function (email, userId) {
  const user = await this.findOne({ email, _id: { $ne: userId } });
  return !!user;
};

userSchema.methods.isPasswordSame = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Send only relevant details of user back to the client
userSchema.methods.transform = function () {
  const userData = {};
  const fields = ["id", "name", "email", "role"];
  fields.forEach((field) => {
    userData[field] = this[field];
  });
  return userData;
};

const User = mongoose.model("User", userSchema);

export default User;

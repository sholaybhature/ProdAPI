import mongoose from "mongoose";

// Refresh token for JWT
const refreshTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const refreshToken = mongoose.model("refreshToken", refreshTokenSchema);
export default refreshToken;

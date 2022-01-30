import { APIError } from "../utils/apiError.js";
import { getUserByEmail } from "./userService.js";
import refreshToken from "../models/refreshTokenModel.js";

export const loginWithEmailPass = async (email, pass) => {
  const user = await getUserByEmail(email);
  if (!user) {
    next(new APIError("User doesn't exists", 400));
  }
  if (!(await user.isPasswordSame(pass))) {
    throw new APIError("Incorrect email or password", 401);
  }
  return user;
};

export const logout = async (token) => {
  const refreshTokenDoc = await refreshToken.findOne({
    token: token,
  });
  if (!refreshTokenDoc) {
    throw new APIError("Not found", 404);
  }
  await refreshTokenDoc.remove();
};

import {
  UserNotFoundError,
  UserNotAuthorizedError,
  NotFoundError,
} from "../utils/apiError.js";
import { getUserByEmail } from "./userService.js";
import refreshToken from "../models/refreshTokenModel.js";

export const loginWithEmailPass = async (email, pass) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new UserNotFoundError();
  }
  if (!(await user.isPasswordSame(pass))) {
    throw new UserNotAuthorizedError();
  }
  return user;
};

export const logout = async (token) => {
  const refreshTokenDoc = await refreshToken.findOne({
    token: token,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new NotFoundError();
  }
  await refreshTokenDoc.remove();
};

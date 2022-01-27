import {
  UserNotFoundError,
  UserNotAuthorizedError,
} from "../utils/apiError.js";
import { getUserByEmail } from "./userService.js";

export const loginWithEmailPass = async (email, pass) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new UserNotFoundError();
  }
  if (!(await user.isPasswordSame(pass))) {
    throw new UserNotAuthorizedError();
  }
  return user.transform();
};

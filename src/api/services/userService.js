import refreshToken from "../models/refreshTokenModel.js";
import User from "../models/userModel.js";
import { APIError } from "../utils/apiError.js";

export const createUser = async (userBody) => {
  const user = User.create(userBody);
  return user;
};

export const getUserById = async (id) => {
  const user = User.findById(id);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = User.findOne({ email });
  return user;
};

export const updateUserById = async (userId, userBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new APIError("User doesn't exists", 404);
  }
  if (userBody.email && (await User.isEmailTaken(userBody.email, userId))) {
    throw new APIError("Email already taken", 400);
  }
  Object.assign(user, userBody);
  // not atomic?!
  user.save();
  return user.transform();
};

export const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new APIError("User doesn't exists", 404);
  }
  await user.remove();
  return user.transform();
};

export const getUsers = async () => {
  const users = await User.find({});
  const usersTransform = users.map((user) => user.transform());
  return usersTransform;
};

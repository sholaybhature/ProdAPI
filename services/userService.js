import User from "../models/userModel.js";
import { UserNotFoundError, UserUpdateError } from "../utils/apiError.js";

export const createUser = async (userBody) => {
  const user = User.create(userBody);
  return user.transform();
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
    throw new UserNotFoundError();
  }
  Object.assign(user, userBody);
  user.save();
  return user.transform();
};

export const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new UserNotFoundError();
  }
  await user.remove();
  return user.transform();
};

import User from "../models/userModel.js";
import {
  APIError,
  UserNotFoundError,
  UserUpdateError,
} from "../utils/apiError.js";

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
    throw new UserNotFoundError();
  }
  if (userBody.email && (await User.isEmailTaken(userBody.email, userId))) {
    throw new APIError("Email already taken", 400);
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

export const getUsers = async () => {
  const users = await User.find({});
  const usersTransform = users.map((user) => user.transform());
  return usersTransform;
};

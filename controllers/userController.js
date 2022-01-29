import {
  deleteUserById,
  getUserById,
  updateUserById,
  getUsers,
} from "../services/userService.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    const userTransform = user.transform();
    res.status(200).json({ user: userTransform });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await updateUserById(id, req.body);
    res.status(204).send({ user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

export const usersList = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

import { deleteUserById, updateUserById } from "../services/userService.js";

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.status(204).send({ user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserById(req.params.id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

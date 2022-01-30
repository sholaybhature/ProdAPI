import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
  usersList,
} from "../../controllers/userController.js";
import auth from "../../middlewares/auth.js";
import validator from "../../middlewares/validator.js";
import { updateUserValidation } from "../../validations/userValidation.js";

const router = express.Router();

// Only allow admin to get list of all users
router.get("/", auth("getUsers"), usersList);
router.get("/:id", auth(), getUser);
router.patch("/:id", auth(), validator(updateUserValidation), updateUser);
router.delete("/:id", auth(), deleteUser);

export default router;

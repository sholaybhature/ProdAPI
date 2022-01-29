import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
  usersList,
} from "../../controllers/userController.js";
import validator from "../../middlewares/validator.js";
import {
  deleteUserValidation,
  updateUserValidation,
} from "../../validations/userValidation.js";

const router = express.Router();

router.get("/", usersList);
router.get("/:id", getUser);
router.patch("/:id", validator(updateUserValidation), updateUser);
router.delete("/:id", validator(deleteUserValidation), deleteUser);

export default router;

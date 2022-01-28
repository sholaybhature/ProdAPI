import express from "express";
import { deleteUser, updateUser } from "../../controllers/userController";
import { validate } from "express-validation";
import { userIdValidation } from "../../validations/userValidation";

const router = express.Router();

// router.get("/:id", getUser)
router.patch("/user/:id", validate(userIdValidation), updateUser);
router.delete("/user/:id", validate(userIdValidation), deleteUser);

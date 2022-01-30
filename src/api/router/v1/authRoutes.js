import express from "express";
import validator from "../../middlewares/validator.js";

import {
  login,
  logoutUser,
  refreshTokens,
  register,
} from "../../controllers/authController.js";
import {
  loginValidation,
  logoutValidation,
  refreshTokenValidation,
  registerValidation,
} from "../../validations/authValidation.js";

const router = express.Router();

router.post("/register", validator(registerValidation), register);
router.post("/login", validator(loginValidation), login);
router.post("/logout", validator(logoutValidation), logoutUser);
router.post("/refresh", validator(refreshTokenValidation), refreshTokens);

export default router;

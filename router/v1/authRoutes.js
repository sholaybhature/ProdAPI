import express from "express";
import { validate } from "express-validation";

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

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.post("/logout", validate(logoutValidation), logoutUser);
router.post("/refresh", validate(refreshTokenValidation), refreshTokens);

export default router;

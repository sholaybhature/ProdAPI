import { createUser } from "../services/userService.js";
import { loginWithEmailPass, logout } from "../services/authService.js";
import {
  generateAuthTokens,
  updateRefreshToken,
} from "../services/tokenService.js";

export const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    // Remove this later
    const token = await generateAuthTokens(user.id, user.role);
    res.status(201);
    res.json({ user: user.transform(), token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginWithEmailPass(email, password);
    const token = await generateAuthTokens(user.id, user.role);
    res.status(200);
    res.json({ user: user.transform(), token });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await logout(req.body.refreshToken);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const refreshTokens = async (req, res, next) => {
  try {
    const token = await updateRefreshToken(req.body.refreshToken);
    res.status(200);
    res.json(token);
  } catch (err) {
    next(err);
  }
};

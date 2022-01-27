import { createUser } from "../services/userService.js";
import { loginWithEmailPass } from "../services/authService.js";
export const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
  // const token = await tokenService.createToken(user);
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginWithEmailPass(email, password);
    // const token = await tokenService.createToken(user);
    // res.status(200).send({ user, token });
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // await authService.logout();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

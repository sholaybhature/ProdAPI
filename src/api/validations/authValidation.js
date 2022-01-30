import Joi from "joi";

export const registerValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const logoutValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

export const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

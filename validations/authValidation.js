import Joi from "joi";

export const registerValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  }),
};

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  }),
};

export const logoutValidation = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokenValidation = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

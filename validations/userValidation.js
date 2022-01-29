import Joi from "joi";

export const userIdValidation = Joi.object({
  id: Joi.string().required(),
});

export const updateUserValidation = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(5),
  name: Joi.string(),
}).min(1);

// If admin refreshToken not needed, else needed.
export const deleteUserValidation = Joi.object({
  refreshToken: Joi.string(),
});

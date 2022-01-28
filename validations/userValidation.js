import Joi from "joi";

export const userIdValidation = {
  body: Joi.object({
    id: Joi.string().required(),
  }),
};

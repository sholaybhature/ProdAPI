import Joi from "joi";
import { APIError } from "../utils/apiError.js";

function validator(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");

      return next(new APIError(errorMessage, 422));
    } else {
      req.body = value;
      next();
    }
  };
}

export default validator;

import jwt from "jsonwebtoken";
import { APIError } from "../utils/apiError.js";

const roles = {
  user: [],
  admin: ["getUsers"],
};

// Verify JWT token and check if the user is an authorized user
function auth(...requiredRights) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          next(new APIError("JWT token is invalid", 401));
        }
        req.user = user;
        if (requiredRights.length) {
          const hasRights = requiredRights.every((requiredRight) =>
            roles[user.role].includes(requiredRight)
          );
          if (!hasRights) {
            next(new APIError("Unauthorized", 403));
          }
        }
        next();
      });
    } else {
      next(new APIError("No JWT token provided", 403));
    }
  };
}

export default auth;

import config from "config";
import jwt from "jsonwebtoken";
import refreshToken from "../models/refreshTokenModel.js";
import { APIError } from "../utils/apiError.js";

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
};

// Instead of saving role here, fetch from db?
const createToken = (userId, userRole, type, expires) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
    eat: expires,
    role: userRole,
    type: type,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Use redis for blacklisting of jwt?
const saveToken = async (token, userId, expires) => {
  const tokenDoc = await refreshToken.create({
    token: token,
    user: userId,
    expires: expires,
  });
  return tokenDoc;
};

export const generateAuthTokens = async (userId, userRole) => {
  const accessTokenExpiry = Date.now() + config.server.jwt.accessTokenExpiry;
  const refreshTokenExpiry = Date.now() + config.server.jwt.refreshTokenExpiry;
  const accessToken = createToken(
    userId,
    userRole,
    tokenTypes.ACCESS,
    accessTokenExpiry
  );
  const refreshToken = createToken(
    userId,
    userRole,
    tokenTypes.REFRESH,
    refreshTokenExpiry
  );
  await saveToken(refreshToken, userId, refreshTokenExpiry);
  return {
    accessToken: {
      token: accessToken,
      expiry: accessTokenExpiry,
    },
    refreshToken: {
      token: refreshToken,
      expiry: refreshTokenExpiry,
    },
  };
};

export const updateRefreshToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const refreshTokenDoc = await refreshToken.findOne({
    token: token,
    user: decoded.sub,
  });
  if (!refreshTokenDoc) {
    throw new APIError("Not found", 404);
  }
  await refreshTokenDoc.remove();
  const newTokens = await generateAuthTokens(decoded.sub, decoded.role);
  return newTokens;
};

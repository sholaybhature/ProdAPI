import config from "config";
import jwt from "jsonwebtoken";
import refreshToken from "../models/refreshTokenModel.js";
import { APIError } from "../utils/apiError.js";

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
};

const createToken = (userId, type, expires) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
    eat: expires,
    type: type,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const saveToken = async (token, userId, expires) => {
  const tokenDoc = await refreshToken.create({
    token: token,
    user: userId,
    expires: expires,
  });
  return tokenDoc;
};

export const generateAuthTokens = async (userId) => {
  const accessTokenExpiry = Date.now() + config.server.jwt.accessTokenExpiry;
  const refreshTokenExpiry = Date.now() + config.server.jwt.refreshTokenExpiry;
  const accessToken = createToken(userId, tokenTypes.ACCESS, accessTokenExpiry);
  const refreshToken = createToken(
    userId,
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
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const tokenDoc = await refreshToken.findOneAndRemove({
    token: token,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new APIError("Token not found", 400);
  }
  const newTokens = await generateAuthTokens(payload.sub);
  return newTokens;
};

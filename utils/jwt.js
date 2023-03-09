import jwt from "jsonwebtoken";

export const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export const isTokenValid = ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

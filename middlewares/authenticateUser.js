import { UnAuthenticatedError, UnauthorizedError } from "../errors/index.js";
import { isTokenValid } from "../utils/index.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = isTokenValid({ token });
    req.user = {
      name: payload.name,
      username: payload.username,
      userId: payload.userId,
    };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

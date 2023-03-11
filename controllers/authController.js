import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { createJWT, createUserToken } from "../utils/index.js";

export const signUp = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    throw new BadRequestError("PLease provide all values");
  }
  const userAlreadyExits = await User.findOne({ username });
  if (userAlreadyExits) {
    throw new BadRequestError("Username already in use");
  }
  const user = await User.create({ name, username, password });
  const tokenUser = createUserToken(user);
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const tokenUser = createUserToken(user);
  const token = createJWT({ payload: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

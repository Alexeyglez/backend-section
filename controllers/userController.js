import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { NotFoundError } from "../errors/index.js";

export const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No found user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
};

export const updateUser = async (req, res) => {
  const { body } = req;
  const { id: userId } = req.params;
  const updateUser = await User.findOneAndUpdate({ _id: userId }, body, {
    new: true,
    runValidators: true,
  });
  if (!updateUser) {
    throw new NotFoundError(`No found user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ updateUser });
};

export const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No found user with id ${userId}`);
  }
  await user.remove();
  res.status(StatusCodes.OK).json({ msg: "Success user removed!" });
};

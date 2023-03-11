import Idea from "../models/Idea.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

export const getIdea = async (req, res) => {
  const { id: ideaId } = req.params;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  res.status(StatusCodes.OK).json({ idea });
};

export const getAllIdeas = async (req, res) => {
  const ideas = await Idea.find();
  res.status(StatusCodes.OK).json({ ideas, count: ideas.length });
};

export const createIdea = async (req, res) => {
  const { idea, description, author, comments } = req.body;
  const ideaw = await Idea.create({ idea, description, author, comments });
  res.status(StatusCodes.CREATED).json({ ideaw });
};

export const updateIdea = async (req, res) => {
  const { body } = req;
  const { id: ideaId } = req.params;
  const updateIdea = await Idea.findOneAndUpdate({ _id: ideaId }, body, {
    new: true,
    runValidators: true,
  });
  if (!updateIdea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  res.status(StatusCodes.OK).json({ updateIdea });
};

export const deleteIdea = async (req, res) => {
  const { id: ideaId } = req.params;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  await idea.remove();
  res.status(StatusCodes.OK).json({ idea });
};

export const getUserIdeas = async (req, res) => {
  const { id: userId } = req.params;
  const ideas = await Idea.find({ author: userId });
  res.status(StatusCodes.OK).json({ ideas });
};

export const upvoteIdea = async (req, res) => {
  const { id: ideaId } = req.params;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  idea.upvotes.push(true);
  idea.save();
  res.status(StatusCodes.OK).json({ idea });
};

export const downvoteIdea = async (req, res) => {
  const { id: ideaId } = req.params;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  idea.downvotes.push(true);
  idea.save();
  res.status(StatusCodes.OK).json({ idea });
};

import { StatusCodes } from "http-status-codes";
import Comment from "../models/Comment.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import Idea from "../models/Idea.js";

export const getComment = async (req, res) => {
  const { id: commentId } = req.parmas;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`NO found Comment with id ${commentId}`);
  }
  res.status(StatusCodes.OK).json({ comment });
};

export const updateComment = async (req, res) => {
  const { body } = req;
  const { id: commentId } = req.parmas;
  const comment = await Comment.findOneAndUpdate({ _id: commentId }, body, {
    new: true,
    runValidators: true,
  });
  if (!comment) {
    throw new NotFoundError(`No found Comment with id ${commentId}`);
  }
  res.status(StatusCodes.OK).json({ comment });
};

export const deleteComment = async (req, res) => {
  const { id: commentId } = req.parmas;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`No found Comment with id ${commentId}`);
  }
  await comment.remove();
  res.status(StatusCodes.OK).json({ comment });
};

export const getIdeaComments = async (req, res) => {
  const { id: ideaId } = req.parmas;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  const { comments } = idea;
  res.status(StatusCodes.OK).json({ comments });
};

export const createComment = async (req, res) => {
  const { body } = req;
  const { id: ideaId } = req.parmas;
  const { id: userId } = req.user;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  const comment = await Comment.create(body, ideaId, userId);
  idea.comments.push(comment._id);
  res.status(StatusCodes.CREATED).json({ comment });
};

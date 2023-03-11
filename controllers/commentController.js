import { StatusCodes } from "http-status-codes";
import Comment from "../models/Comment.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import Idea from "../models/Idea.js";

export const getAllComments = async (req, res) => {
  const comments = await Comment.find();
  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

export const getComment = async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`No found Comment with id ${commentId}`);
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
  const { ideaId } = req.params;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  console.log(idea.comments);
  const { comments } = idea;
  res.status(StatusCodes.OK).json({ comments });
};

export const createComment = async (req, res) => {
  const { comment, description } = req.body;
  const { ideaId } = req.params;
  const { userId: author } = req.user;
  const idea = await Idea.findOne({ _id: ideaId });
  if (!idea) {
    throw new NotFoundError(`No found Idea with id ${ideaId}`);
  }
  const commentNew = await Comment.create({
    comment,
    description,
    author,
  });
  idea.comments.push(commentNew._id);
  /*await Idea.findOneAndUpdate(
    { _id: ideaId },
    { comments: idea.comments },
    { new: true }
  );*/
  await idea.save();
  res.status(StatusCodes.CREATED).json({ commentNew });
};

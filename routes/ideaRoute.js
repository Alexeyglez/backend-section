import { Router } from "express";

const router = Router();

import {
  createIdea,
  deleteIdea,
  downvoteIdea,
  getAllIdeas,
  getIdea,
  getUserIdeas,
  updateIdea,
  upvoteIdea,
} from "../controllers/ideaController.js";

import { authenticateUser } from "../middlewares/authenticateUser.js";

router.route("").get(getAllIdeas).post(authenticateUser, createIdea);
router.route("/:id/all").get(getUserIdeas);
router.route("/:id").get(getIdea).patch(updateIdea).delete(deleteIdea);
router.route("/:id/upvote").post(upvoteIdea);
router.route("/:id/downvote").post(downvoteIdea);

export default router;

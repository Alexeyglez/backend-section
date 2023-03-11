import { Router } from "express";

const router = Router();

import {
  createComment,
  deleteComment,
  getComment,
  getIdeaComments,
  updateComment,
  getAllComments,
} from "../controllers/commentController.js";

import { authenticateUser } from "../middlewares/authenticateUser.js";

router.route("").get(getAllComments);
router
  .route("/:id/unique")
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);
router
  .route("/:ideaId")
  .post(authenticateUser, createComment)
  .get(authenticateUser, getIdeaComments);

export default router;

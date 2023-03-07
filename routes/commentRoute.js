import { Router } from "express";

const router = Router();

import {
  createComment,
  deleteComment,
  getComment,
  getIdeaComments,
  updateComment,
} from "../controllers/commentController.js";

router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);
router.route("/:ideaId").post(createComment).get(getIdeaComments);

export default router;

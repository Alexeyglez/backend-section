import { Router } from "express";

const router = Router();

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

router.route("").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

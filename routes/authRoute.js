import { Router } from "express";

const router = Router();

import { signIn, signUp } from "../controllers/authController.js";

router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);

export default router;

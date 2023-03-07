import { Router } from "express";

const router = Router();

import { home } from "../controllers/homeController.js";

router.route("/").get(home);

export default router;

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/verifyToken", verifyToken);
router.post("/signin", authController.signIn);

export default router;

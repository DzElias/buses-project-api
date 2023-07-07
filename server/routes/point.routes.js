import { Router } from "express";
import * as pointController from "../controllers/points.controller.js";

const router = Router();
router.get("/:id", pointController.getPoints);

export default router;

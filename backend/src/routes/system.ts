import { Router } from "express";
import { healthCheck, getMe, getSummary } from "../controllers/system.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";

const router = Router();

router.get("/health", healthCheck);

router.get("/me", authenticate, getMe);

router.get("/summary", authenticate, requireRole("owner", "admin"), getSummary);

export default router;

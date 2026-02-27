import { Router } from "express";
import { healthCheck, getMe, getSummary } from "../controllers/system.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";

const router = Router();

router.get("/health", healthCheck);

router.get("/me", authenticate, getMe);

router.get("/summary", authenticate, requireRole("owner", "admin"), getSummary);

export default router;

/**
 * @swagger
 * tags:
 *   name: System
 *   description: System and authentication related APIs
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System health status
 */

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [System]
 *     security:
 *       - UserIdAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: Get booking summary grouped by user (Admin/Owner only)
 *     tags: [System]
 *     security:
 *       - UserIdAuth: []
 *     responses:
 *       200:
 *         description: Booking summary
 *       403:
 *         description: Forbidden
 */

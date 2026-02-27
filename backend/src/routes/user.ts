import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser,
} from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import {
  createUserSchema,
  updateUserRoleSchema,
  userIdSchema,
} from "../validation/user.schema.js";

const router = Router();

// router.use(authenticate);
// router.use(requireRole("admin"));

router.get("/", getUsers);
router.post(
  "/",
  authenticate,
  requireRole("admin"),
  validateBody(createUserSchema),
  createUser,
);
router.put(
  "/:id/role",
  authenticate,
  requireRole("admin"),
  validateParams(userIdSchema),
  validateBody(updateUserRoleSchema),
  updateUserRole,
);
router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  validateParams(userIdSchema),
  deleteUser,
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - UserIdAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Update user role (Admin only)
 *     tags: [Users]
 *     security:
 *       - UserIdAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRoleInput'
 *     responses:
 *       200:
 *         description: Role updated
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - UserIdAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: Not found
 */

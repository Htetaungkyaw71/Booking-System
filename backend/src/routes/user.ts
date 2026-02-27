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

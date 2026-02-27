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

// [
//   {
//     id: "f7c12463-20d4-4749-ac78-b6de0f2e4684",
//     name: "Ada Admin",
//     role: "admin",
//   },
//   {
//     id: "6a936066-a163-429a-b6bd-9edade5ee567",
//     name: "Olivia Owner",
//     role: "user",
//   },
//   {
//     id: "cf6a80e6-35ff-4cfe-9f7a-4a30c2d90979",
//     name: "Uma User",
//     role: "user",
//   },
// ];

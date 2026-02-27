import { z } from "zod";
export const roleEnum = z.enum(["admin", "owner", "user"]);
export const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: roleEnum.default("user"),
});
export const updateUserRoleSchema = z.object({
    role: roleEnum,
});
export const userIdSchema = z.object({
    id: z.string().min(1, "User id is required"),
});
//# sourceMappingURL=user.schema.js.map
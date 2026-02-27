import { prisma } from "../lib/prisma.js";
export async function getUsers(_req, res) {
    const users = await prisma.user.findMany({
        orderBy: { name: "asc" },
    });
    res.json(users);
}
export async function createUser(req, res) {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                role: req.body.role,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user." });
    }
}
export async function updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid user ID." });
    }
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const updated = await prisma.user.update({
            where: { id },
            data: { role },
        });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update role" });
    }
}
export async function deleteUser(req, res) {
    const { id } = req.params;
    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid user ID." });
    }
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        if (user.id === id) {
            return res.status(400).json({
                error: "You cannot delete yourself.",
            });
        }
        await prisma.user.delete({ where: { id } });
        res.status(200).json({ deletedUserId: id });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user." });
    }
}
//# sourceMappingURL=user.js.map
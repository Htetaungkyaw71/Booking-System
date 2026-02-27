import { prisma } from "../lib/prisma.js";
export async function authenticate(req, res, next) {
    try {
        const userId = req.header("x-user-id");
        if (!userId) {
            return res.status(401).json({ error: "Missing x-user-id header." });
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(401).json({ error: "Invalid user." });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(500).json({ error: "Authentication failed." });
    }
}
//# sourceMappingURL=auth.js.map
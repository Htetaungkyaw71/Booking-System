import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    role: "admin" | "owner" | "user";
  };
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
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
  } catch {
    return res.status(500).json({ error: "Authentication failed." });
  }
}

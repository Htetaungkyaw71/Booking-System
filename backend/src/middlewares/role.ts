import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.js";

export function requireRole(...roles: ("admin" | "owner" | "user")[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden." });
    }
    next();
  };
}

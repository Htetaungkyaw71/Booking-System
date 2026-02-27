import type { Response } from "express";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewares/auth.js";

export function healthCheck(_req: any, res: Response) {
  res.status(200).json({
    status: "ok",
    timeStandard: "UTC ISO 8601. Booking ranges are treated as [start, end).",
  });
}

export function getMe(req: AuthRequest, res: Response) {
  res.status(200).json(req.user);
}

export async function getSummary(req: AuthRequest, res: Response) {
  const [users, bookings] = await Promise.all([
    prisma.user.findMany({ orderBy: { name: "asc" } }),
    prisma.booking.findMany({
      orderBy: { startTime: "asc" },
      include: {
        user: true,
      },
    }),
  ]);

  const grouped: Record<string, any[]> = {};

  for (const booking of bookings) {
    if (!grouped[booking.userId]) {
      grouped[booking.userId] = [];
    }
    grouped[booking.userId]!.push(booking);
  }
  const totals = await prisma.booking.groupBy({
    by: ["userId"],

    _count: true,
  });

  res.status(200).json({ groupedBookings: grouped, totals });
}

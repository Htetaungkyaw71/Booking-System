import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.js";
import { prisma } from "../lib/prisma.js";
import { createBooking } from "../services/bookings.js";

export async function getBookings(req: AuthRequest, res: Response) {
  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: "asc" },
    include: {
      user: true,
    },
  });

  res.json(bookings);
}
export async function getMyBookings(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        startTime: "asc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

export async function postBooking(req: AuthRequest, res: Response) {
  const { startTime, endTime } = req.body;

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return res.status(400).json({ error: "Invalid time range." });
  }

  try {
    const booking = await createBooking(req.user!.id, start, end);
    res.status(201).json(booking);
  } catch (err) {
    if ((err as Error).message === "OVERLAP") {
      return res.status(409).json({ error: "Booking overlap." });
    }
    res.status(500).json({ error: "Failed to create booking." });
  }
}

export async function deleteBooking(req: AuthRequest, res: Response) {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id as string },
  });

  if (!booking) {
    return res.status(404).json({ error: "Not found." });
  }

  const canDeleteAny = req.user!.role === "admin" || req.user!.role === "owner";

  if (!canDeleteAny && booking.userId !== req.user!.id) {
    return res.status(403).json({ error: "Not allowed." });
  }

  await prisma.booking.delete({ where: { id: booking.id } });

  res.json({ deleted: booking.id });
}

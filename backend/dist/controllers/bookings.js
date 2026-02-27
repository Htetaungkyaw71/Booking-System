import { prisma } from "../lib/prisma.js";
import { createBooking } from "../services/bookings.js";
export async function getBookings(req, res) {
    const bookings = await prisma.booking.findMany({
        orderBy: { startTime: "asc" },
    });
    res.json(bookings);
}
export async function postBooking(req, res) {
    const { startTime, endTime } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
        return res.status(400).json({ error: "Invalid time range." });
    }
    try {
        const booking = await createBooking(req.user.id, start, end);
        res.status(201).json(booking);
    }
    catch (err) {
        if (err.message === "OVERLAP") {
            return res.status(409).json({ error: "Booking overlap." });
        }
        res.status(500).json({ error: "Failed to create booking." });
    }
}
export async function deleteBooking(req, res) {
    const booking = await prisma.booking.findUnique({
        where: { id: req.params.id },
    });
    if (!booking) {
        return res.status(404).json({ error: "Not found." });
    }
    const canDeleteAny = req.user.role === "admin" || req.user.role === "owner";
    if (!canDeleteAny && booking.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed." });
    }
    await prisma.booking.delete({ where: { id: booking.id } });
    res.json({ deleted: booking.id });
}
//# sourceMappingURL=bookings.js.map
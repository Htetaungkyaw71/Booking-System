import { prisma } from "../lib/prisma.js";
export function healthCheck(_req, res) {
    res.status(200).json({
        status: "ok",
        timeStandard: "UTC ISO 8601. Booking ranges are treated as [start, end).",
    });
}
export function getMe(req, res) {
    res.status(200).json(req.user);
}
export async function getSummary(req, res) {
    const [users, bookings] = await Promise.all([
        prisma.user.findMany({ orderBy: { name: "asc" } }),
        prisma.booking.findMany({ orderBy: { startTime: "asc" } }),
    ]);
    const grouped = {};
    for (const booking of bookings) {
        if (!grouped[booking.userId]) {
            grouped[booking.userId] = [];
        }
        grouped[booking.userId].push(booking);
    }
    const totals = await prisma.booking.groupBy({
        by: ["userId"],
        _count: true,
    });
    res.status(200).json({ groupedBookings: grouped, totals });
}
//# sourceMappingURL=system.js.map
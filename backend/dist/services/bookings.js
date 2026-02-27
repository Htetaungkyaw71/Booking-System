import { prisma } from "../lib/prisma.js";
export async function createBooking(userId, startTime, endTime) {
    const conflict = await prisma.booking.findFirst({
        where: {
            startTime: { lt: endTime },
            endTime: { gt: startTime },
        },
    });
    if (conflict) {
        throw new Error("OVERLAP");
    }
    return prisma.booking.create({
        data: { userId, startTime, endTime },
    });
}
//# sourceMappingURL=bookings.js.map
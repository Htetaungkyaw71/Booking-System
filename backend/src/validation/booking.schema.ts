import { z } from "zod";

export const createBookingSchema = z.object({
  startTime: z
    .string()
    .datetime({ message: "startTime must be valid ISO date" }),
  endTime: z.string().datetime({ message: "endTime must be valid ISO date" }),
});

export const bookingIdSchema = z.object({
  id: z.string().min(1, "Booking id is required"),
});

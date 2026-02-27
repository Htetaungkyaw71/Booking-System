import { Router } from "express";
import {
  getBookings,
  postBooking,
  deleteBooking,
  getMyBookings,
} from "../controllers/bookings.js";
import { authenticate } from "../middlewares/auth.js";
import {
  bookingIdSchema,
  createBookingSchema,
} from "../validation/booking.schema.js";
import { validateBody, validateParams } from "../middlewares/validate.js";

const router = Router();

router.use(authenticate);

router.get("/", getBookings);
router.get("/mybookings", getMyBookings);
router.post("/", validateBody(createBookingSchema), postBooking);
router.delete("/:id", validateParams(bookingIdSchema), deleteBooking);

export default router;

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

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management APIs
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - UserIdAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /bookings/mybookings:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - UserIdAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create booking
 *     tags: [Bookings]
 *     security:
 *       - UserIdAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingInput'
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Booking overlap
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     security:
 *       - UserIdAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 *       403:
 *         description: Not allowed
 *       404:
 *         description: Booking not found
 */

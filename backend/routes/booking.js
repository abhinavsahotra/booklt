const express = require("express");
const bookingRouter = express.Router();
const BookingModel = require("../models/Bookings");
const zod = require("zod");
const { verifyUser } = require("../middleware/authMiddleware");

function generateRefId() {
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BK-${date}-${random}`;
}

const bookingPost = zod.object({
    userId: zod.string(),
    experienceId: zod.string(),
    date: zod.string(),
    time: zod.string(),
    quantity: zod.number().min(1),
    total: zod.number().nonnegative(),
})

bookingRouter.post("/", verifyUser, async (req, res) => {
    const body = bookingPost.safeParse(req.body);

   if (!body.success) {
    return res.status(400).json({ 
    message: "Every content must be in string / Invalid Data" 
    });
  }

  try {
    const { userId, experienceId, date, time, quantity, total } = req.body;
    console.log(body)

    if (!date || !time) {
      return res.status(400).json({ success: false, message: "Date and time required" });
    }

    const refId = generateRefId();

    const createBooking = await BookingModel.create({
      userId,
      experienceId,
      date,
      time,
      quantity,
      total,
      refId,
    });

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      refId,
      bookingId: createBooking._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Booking failed" });
  }
});

module.exports = {
    bookingRouter: bookingRouter
}

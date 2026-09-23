const Booking = require("../models/Booking");
const Trainer = require("../models/Trainer");
const sendEmail = require("../utils/sendEmail");

// @route POST /api/bookings  (protected)
const createBooking = async (req, res) => {
  try {
    const { trainerId, date, timeSlot } = req.body;

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    const booking = await Booking.create({
      user: req.user._id,
      trainer: trainerId,
      date,
      timeSlot,
    });

    // Email confirmation to the member
    sendEmail({
      to: req.user.email,
      subject: "Your Training Session is Booked!",
      html: `
        <h2>Hi ${req.user.name},</h2>
        <p>Your session with <b>${trainer.name}</b> is booked for:</p>
        <p>📅 ${new Date(date).toDateString()} at ${timeSlot}</p>
        <p>See you at the gym!</p>
      `,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/bookings/my  (protected)
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("trainer", "name specialty")
    .sort({ date: -1 });
  res.json(bookings);
};

module.exports = { createBooking, getMyBookings };

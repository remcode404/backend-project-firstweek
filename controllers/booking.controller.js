const Booking = require('../models/Booking.model');

module.exports.bookingController = {
  printBooking: async (req, res) => {
    try {
      const booking = await Booking.find();
      res.json(booking);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  createBooking: async (req, res) => {
    try {
      console.log(req.user.id);
      const {numberTable, nameUser, numberUser, date, time } = req.body;
      const booking = await Booking.create({
        userId: req.user.id,
        numberTable,
        nameUser,
        numberUser,
        date,
        time,
      });
      res.json(booking);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};

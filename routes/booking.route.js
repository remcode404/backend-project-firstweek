const { Router } = require('express');
const { bookingController } = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/booking', bookingController.printBooking);
router.post('/booking', authMiddleware, bookingController.createBooking);

module.exports = router;

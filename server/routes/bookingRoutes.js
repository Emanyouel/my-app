const express = require('express')
const router  = express.Router()

const {
  getSalonData,
  getAvailableSlots,
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController')

router.get('/salon',    getSalonData)
router.get('/available', getAvailableSlots)
router.post('/',         createBooking)
router.get('/',          getUserBookings)
router.put('/:id',       updateBooking)
router.delete('/:id',    deleteBooking)

module.exports = router

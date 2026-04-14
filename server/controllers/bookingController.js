const { staff, services, openingHours } = require('../data/salondata')
const generateTimeSlots = require('../utils/generateTimeslots')

let bookings = []

exports.getSalonData = (req, res) => {
  res.json({ staff, services })
}

exports.getAvailableSlots = (req, res) => {
  const { date, staffId } = req.query

  const all_slots = generateTimeSlots(openingHours.start, openingHours.end)

  const taken = []
  for (let i = 0; i < bookings.length; i++) {
    const b = bookings[i]
    if (b.date === date && b.staffId === Number(staffId)) {
      taken.push(b.time)
    }
  }

  const available = all_slots.filter((slot) => !taken.includes(slot))

  res.json(available)
}

exports.createBooking = (req, res) => {
  const { name, serviceId, staffId, date, time } = req.body

  const conflict = bookings.find(
    (b) => b.staffId === staffId && b.date === date && b.time === time
  )

  if (conflict) {
    return res.status(400).json({ message: 'That time slot is already taken' })
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    serviceId,
    staffId,
    date,
    time
  }

  bookings.push(newBooking)

  res.status(201).json(newBooking)
}

exports.getUserBookings = (req, res) => {
  const { name } = req.query

  const user_bookings = bookings
    .filter((b) => b.name.toLowerCase() === name.toLowerCase())
    .map((booking) => {
      const svc = services.find((s) => s.id === Number(booking.serviceId))

      return {
        ...booking,
        serviceName: svc ? svc.name : 'Unknown Service'
      }
    })

  res.json(user_bookings)
}

exports.updateBooking = (req, res) => {
  const id = Number(req.params.id)
  const { date, time, staffId } = req.body

  const booking = bookings.find((b) => b.id === id)

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  // exclude current booking when checking for slot conflicts
  const slotTaken = bookings.find(
    (b) => b.id !== id && b.staffId === staffId && b.date === date && b.time === time
  )

  if (slotTaken) {
    return res.status(400).json({ message: 'That slot is already booked' })
  }

  booking.date    = date
  booking.time    = time
  booking.staffId = staffId

  res.json(booking)
}

exports.deleteBooking = (req, res) => {
  const id = Number(req.params.id)

  bookings = bookings.filter((b) => b.id !== id)

  res.json({ message: 'Booking deleted' })
}

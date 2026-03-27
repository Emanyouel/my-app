const { staff, services, openingHours } = require("../data/salondata");
const generateTimeSlots = require("../utils/generateTimeslots");

let bookings = [];

exports.getSalonData = (req, res) => {
  res.json({ staff, services });
};

exports.getAvailableSlots = (req, res) => {
  const { date, staffId } = req.query;

  const allSlots = generateTimeSlots(
    openingHours.start,
    openingHours.end
  );

  const bookedSlots = bookings
    .filter(
      (b) => b.date === date && b.staffId === Number(staffId)
    )
    .map((b) => b.time);

  const availableSlots = allSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  res.json(availableSlots);
};

exports.createBooking = (req, res) => {
  const { name, serviceId, staffId, date, time } = req.body;

  const existingBooking = bookings.find(
    (b) =>
      b.staffId === staffId &&
      b.date === date &&
      b.time === time
  );

  if (existingBooking) {
    return res.status(400).json({
      message: "Time slot already booked"
    });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    serviceId,
    staffId,
    date,
    time
  };

  bookings.push(newBooking);

  res.status(201).json(newBooking);
};

// Get bookings by name
exports.getUserBookings = (req, res) => {
  const { name } = req.query;

  const userBookings = bookings
    .filter(
      (b) => b.name.toLowerCase() === name.toLowerCase()
    )
    .map((booking) => {
      const service = services.find(
        (s) => s.id === Number(booking.serviceId)
      );

      return {
        ...booking,
        serviceName: service
          ? service.name
          : "Unknown Service"
      };
    });

  res.json(userBookings);
};

// Update booking
exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const { date, time, staffId } = req.body;

  const booking = bookings.find(
    (b) => b.id === Number(id)
  );

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Check if new slot already taken
  const slotTaken = bookings.find(
    (b) =>
      b.id !== Number(id) &&
      b.staffId === staffId &&
      b.date === date &&
      b.time === time
  );

  if (slotTaken) {
    return res.status(400).json({
      message: "Time slot already booked"
    });
  }

  booking.date = date;
  booking.time = time;
  booking.staffId = staffId;

  res.json(booking);
};

// Delete booking
exports.deleteBooking = (req, res) => {
  const { id } = req.params;

  bookings = bookings.filter(
    (b) => b.id !== Number(id)
  );

  res.json({ message: "Booking deleted" });
};
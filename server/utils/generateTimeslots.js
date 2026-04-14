// generates half-hour slots from startHour up to (but not including) endHour
// e.g. start=9, end=17 → ["9:00","9:30","10:00", ... "16:30"]

function generateTimeSlots(startHour, endHour) {
  const slots = []

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`)
    slots.push(`${hour}:30`)
  }

  return slots
}

module.exports = generateTimeSlots

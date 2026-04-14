// time slot buttons
const TimeSlots = ({ slots, form, setForm }) => {
  if (slots.length === 0) {
    return (
      <p className="text-sm text-gray-500 mb-4">
        No available slots for this date.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {slots.map((slot) => {
        const isSelected = form.time === slot;

        return (
          <button
            type="button"
            key={slot}
            onClick={() => setForm({ ...form, time: slot })}
            className={`p-2 border rounded text-sm ${
              isSelected
                ? "bg-[#4B4B4B] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSlots;

const TimeSlots = ({ slots, form, setForm }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {slots.map((slot) => (
        <button
          type="button"
          key={slot}
          onClick={() => setForm({ ...form, time: slot })}
          className={`p-2 border rounded ${
            form.time === slot ? "bg-[#4B4B4B] text-white" : "bg-gray-100"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;

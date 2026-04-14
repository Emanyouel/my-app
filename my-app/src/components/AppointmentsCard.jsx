import { useState } from "react";
import API from "../api/api";

const AppointmentCard = ({ appointment, refreshAppointments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await API.delete(`/bookings/${appointment.id}`);
      refreshAppointments();
    } catch {
      alert("Failed to delete — try again");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await API.put(`/bookings/${appointment.id}`, {
        date,
        time,
        staffId: appointment.staffId,
      });

      setIsEditing(false);
      refreshAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setDate(appointment.date);
    setTime(appointment.time);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      {isEditing ? (
        <>
          <p className="font-semibold mb-2">
            Service: {appointment.serviceName}
          </p>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 mr-2 mb-2"
          />

          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 mr-2 mb-2"
            placeholder="e.g. 10:00"
          />
        </>
      ) : (
        <>
          <p className="font-semibold">Service: {appointment.serviceName}</p>
          <p className="text-sm text-gray-700">Date: {appointment.date}</p>
          <p className="text-sm text-gray-700">Time: {appointment.time}</p>
        </>
      )}

      <div className="mt-3 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              Save
            </button>

            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;

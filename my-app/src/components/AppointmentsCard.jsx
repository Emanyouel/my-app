import { useState } from "react";
import API from "../api/api";

const AppointmentCard = ({ appointment, refreshAppointments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await API.delete(`/bookings/${appointment.id}`);
      refreshAppointments();
    } catch (error) {
      alert("Failed to delete booking");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await API.put(`/bookings/${appointment.id}`, {
        date,
        time,
        staffId: appointment.staffId,
      });

      setIsEditing(false);
      refreshAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
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
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
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
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Update
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

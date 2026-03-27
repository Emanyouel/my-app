import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";
import AppointmentCard from "../components/AppointmentsCard";

const AppointmentsPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (name) {
      API.get(`/bookings?name=${name}`).then((res) =>
        setAppointments(res.data),
      );
    }
  }, [name]);

  const refreshAppointments = () => {
    API.get(`/bookings?name=${name}`).then((res) => setAppointments(res.data));
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 && <p>No bookings found.</p>}

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          refreshAppointments={refreshAppointments}
        />
      ))}
    </div>
  );
};

export default AppointmentsPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import StaffSelect from "./StaffSelect";
import TimeSlots from "./TimeSlots";
import { useSearchParams } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const serviceIdFromURL = searchParams.get("serviceId");
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [form, setForm] = useState({
    name: "",
    serviceId: serviceIdFromURL || "",
    staffId: "",
    date: "",
    time: "",
  });

  // Load salon data (services + staff)
  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        const res = await API.get("/bookings/salon");
        setServices(res.data.services);
        setStaff(res.data.staff);
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    fetchSalonData();
  }, []);

  // Fetch available time slots when date + staff selected
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (form.date && form.staffId) {
        try {
          const res = await API.get("/bookings/available", {
            params: {
              date: form.date,
              staffId: form.staffId,
            },
          });

          setAvailableSlots(res.data);
        } catch (error) {
          console.error("Error fetching slots:", error);
        }
      } else {
        setAvailableSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [form.date, form.staffId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.time) {
      alert("Please select a time slot");
      return;
    }

    try {
      await API.post("/bookings", form);

      // Redirect to appointments page with name in query
      navigate(`/appointments?name=${form.name}`);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow"
    >
      {/* Name */}
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      {form.serviceId && (
        <p className="mb-4 font-semibold">
          Service Selected:{" "}
          {services.find((s) => s.id === Number(form.serviceId))?.name}
        </p>
      )}

      {/* Staff */}
      <StaffSelect staff={staff} form={form} setForm={setForm} />

      {/* Date */}
      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
            time: "", // reset selected time if date changes
          })
        }
        className="w-full mb-4 p-2 border rounded"
        required
      />

      {/* Time Slots */}
      {form.date && form.staffId && (
        <TimeSlots slots={availableSlots} form={form} setForm={setForm} />
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#4B4B4B] text-white py-2 rounded mt-4 hover:bg-black transition"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default BookingForm;

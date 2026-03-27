import BookingForm from "../components/BookingForm";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Miracle Salon Booking
      </h1>

      <BookingForm />
    </div>
  );
};

export default BookingPage;

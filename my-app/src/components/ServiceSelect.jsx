// service dropdown

const ServiceSelect = ({ services, form, setForm }) => {
  return (
    <select
      value={form.serviceId}
      onChange={(e) => setForm({ ...form, serviceId: Number(e.target.value) })}
      className="w-full mb-4 p-2 border rounded"
      required
    >
      <option value="">Select Service</option>

      {services.map((svc) => (
        <option key={svc.id} value={svc.id}>
          {svc.name}
        </option>
      ))}
    </select>
  );
};

export default ServiceSelect;

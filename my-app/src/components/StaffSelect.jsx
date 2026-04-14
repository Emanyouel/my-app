// staff dropdown

const StaffSelect = ({ staff, form, setForm }) => {
  return (
    <select
      value={form.staffId}
      onChange={(e) => {
        setForm({ ...form, staffId: Number(e.target.value) });
      }}
      className="w-full mb-4 p-2 border rounded"
      required
    >
      <option value="">Select Staff Member</option>

      {staff.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </select>
  );
};

export default StaffSelect;

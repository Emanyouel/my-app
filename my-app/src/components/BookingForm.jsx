import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import API from '../api/api'
import StaffSelect from './StaffSelect'
import TimeSlots from './TimeSlots'

const BookingForm = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const serviceIdFromURL = searchParams.get('serviceId')

  const [services, setServices]             = useState([])
  const [staff, setStaff]                   = useState([])
  const [availableSlots, setAvailableSlots] = useState([])

  const [form, setForm] = useState({
    name: '',
    serviceId: serviceIdFromURL || '',
    staffId: '',
    date: '',
    time: ''
  })

  useEffect(() => {
    const loadSalonData = async () => {
      try {
        const res = await API.get('/bookings/salon')
        setServices(res.data.services)
        setStaff(res.data.staff)
      } catch (err) {
        console.error('Could not load salon data:', err)
      }
    }

    loadSalonData()
  }, [])

  useEffect(() => {
    if (!form.date || !form.staffId) {
      setAvailableSlots([])
      return
    }

    const fetchSlots = async () => {
      try {
        const res = await API.get('/bookings/available', {
          params: { date: form.date, staffId: form.staffId }
        })
        setAvailableSlots(res.data)
      } catch (err) {
        console.error('Failed to get available slots:', err)
        setAvailableSlots([])
      }
    }

    fetchSlots()
  }, [form.date, form.staffId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // time slot buttons don't have a required attribute so we validate manually
    if (!form.time) {
      alert('Please select a time slot')
      return
    }

    try {
      await API.post('/bookings', form)
      navigate(`/appointments?name=${form.name}`)
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong, please try again')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto bg-white p-6 rounded-xl shadow'
    >

      <input
        type='text'
        placeholder='Your Name'
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className='w-full mb-4 p-2 border rounded'
        required
      />

      {form.serviceId && (
        <p className='mb-4 font-semibold'>
          Service:{' '}
          {services.find((s) => s.id === Number(form.serviceId))?.name ?? 'Loading...'}
        </p>
      )}

      <StaffSelect staff={staff} form={form} setForm={setForm} />

      <input
        type='date'
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
            time: '' // reset time when date changes
          })
        }
        className='w-full mb-4 p-2 border rounded'
        required
      />

      {form.date && form.staffId && (
        <TimeSlots slots={availableSlots} form={form} setForm={setForm} />
      )}

      <button
        type='submit'
        className='w-full bg-[#4B4B4B] text-white py-2 rounded mt-4 hover:bg-black transition'
      >
        Book Appointment
      </button>

    </form>
  )
}

export default BookingForm

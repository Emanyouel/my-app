import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from '../api/api'
import AppointmentCard from '../components/AppointmentsCard'

const AppointmentsPage = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')

  const [appointments, setAppointments] = useState([])

  const loadAppointments = () => {
    if (!name) return

    API.get(`/bookings?name=${name}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => {
        console.error('Could not load appointments:', err)
      })
  }

  useEffect(() => {
    loadAppointments()
  }, [name])

  return (
    <div className='min-h-screen bg-gray-200 p-6'>
      <h1 className='text-2xl font-bold mb-6'>My Appointments</h1>

      {!name && (
        <p className='text-gray-500'>No name provided — go back and book an appointment first.</p>
      )}

      {name && appointments.length === 0 && (
        <p>No bookings found for <strong>{name}</strong>.</p>
      )}

      {appointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
          refreshAppointments={loadAppointments}
        />
      ))}
    </div>
  )
}

export default AppointmentsPage

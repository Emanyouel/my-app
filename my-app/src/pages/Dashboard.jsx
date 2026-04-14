import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])

  useEffect(() => {
    API.get('/bookings/salon')
      .then((res) => {
        setServices(res.data.services)
      })
      .catch((err) => {
        console.error('Dashboard: failed to load services', err)
      })
  }, [])

  const handleBookNow = (service) => {
    navigate(`/book?serviceId=${service.id}`)
  }

  return (
    <div className='min-h-screen bg-gray-200'>

      {/* ---- NAV ---- */}
      <nav className='bg-[#4B4B4B] text-white px-10 py-4 flex items-center justify-between'>
        <div className='bg-white text-black px-4 py-1 font-semibold tracking-widest'>
          MIRACLE
        </div>

        <ul className='flex gap-8 text-sm'>
          <li className='underline underline-offset-4'>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Products</li>
          <li>Gallery</li>
        </ul>

        <button
          onClick={() => navigate('/book')}
          className='bg-white text-black px-6 py-1 rounded-full text-sm font-medium'
        >
          Book
        </button>
      </nav>

      {/* ---- HERO SECTION ---- */}
      <div className='px-10 mt-8'>
        <div className='relative rounded-2xl overflow-hidden'>

          <div className='w-full h-[520px] bg-[url("https://images.pexels.com/photos/7518736/pexels-photo-7518736.jpeg")] bg-fixed bg-center bg-cover' />

          <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4'>
            <p className='text-lg'>Welcome to</p>
            <h1 className='text-5xl font-serif tracking-wide mt-2'>MIRACLE</h1>

            <p className='max-w-md mt-4 text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button className='mt-8 bg-white text-black px-40 py-3 text-sm font-semibold tracking-wide rounded-full hover:bg-[#4B4B4B] hover:text-white transition duration-300'>
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* ---- INTRO TEXT ---- */}
      <div className='text-center mt-16 px-6'>
        <h2 className='text-xl font-semibold'>Beauty Experience</h2>
        <p className='text-gray-600 text-sm max-w-xl mx-auto mt-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* ---- SERVICE CARDS ---- */}
      <div className='px-10 mt-12 pb-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>

          {services.map((service) => (
            <div
              key={service.id}
              className='bg-white rounded-2xl overflow-hidden shadow-lg group transition duration-300 hover:-translate-y-2'
            >
              <img
                src={service.img}
                alt={service.name}
                className='w-full h-64 object-cover'
              />

              <div className='p-5 text-center'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  {service.name}
                </h3>

                <button
                  onClick={() => handleBookNow(service)}
                  className='bg-[#4B4B4B] text-white px-6 py-2 rounded-full text-sm hover:bg-black transition'
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Dashboard

const express = require('express')
const cors    = require('cors')

const bookingRoutes = require('./routes/bookingRoutes')

const app = express()

app.use(cors({ origin: '*' }))

app.use(express.json())

app.use('/api/bookings', bookingRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
})

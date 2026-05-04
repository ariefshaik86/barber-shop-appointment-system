import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { servicesAPI, barbersAPI, timeSlotsAPI, bookingsAPI } from '../services/api'

const CustomerBooking = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([])
  const [barbers, setBarbers] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [bookingData, setBookingData] = useState({
    service: null,
    barber: null,
    timeSlot: null,
    date: '',
    name: '',
    phone: ''
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  // 🔥 refetch when date changes
  useEffect(() => {
  if (bookingData.date && bookingData.barber) {
    fetchInitialData()
  }
}, [bookingData.date, bookingData.barber])

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const [servicesData, barbersData, slotsData, bookingsData] = await Promise.all([
        servicesAPI.getAll(),
        barbersAPI.getAll(),
        timeSlotsAPI.getAll(),
        bookingsAPI.getAll()
      ])

      // axios returns { data: [...] }
      const services = servicesData?.data || servicesData
      const barbers = barbersData?.data || barbersData
      const slots = slotsData?.data || slotsData
      const bookings = bookingsData?.data || bookingsData

      setServices(Array.isArray(services) ? services : [])
      setBarbers(Array.isArray(barbers) ? barbers : [])

      const selectedDate = bookingData.date

      // 🔥 booked times for selected date
    const bookedTimes = bookingsData
  .filter(b =>
    bookingData.date &&
    bookingData.barber &&
    b.dateTime.startsWith(bookingData.date) &&
    b.barberName === bookingData.barber.name
  )
  .map(b => new Date(b.dateTime).toISOString().substring(11, 16))

const formattedSlots = (Array.isArray(slotsData) ? slotsData : []).map(slot => {
  const timeValue = slot.slotTime || slot.time

  return {
    ...slot,
    slotTime: timeValue,
    time: timeValue,
    available: !bookedTimes.includes(timeValue)
  }
})

setTimeSlots(formattedSlots)

    

    } catch (error) {
      console.error('Error fetching initial data:', error)
      toast.error('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleServiceSelect = (service) => {
    setBookingData(prev => ({ ...prev, service }))
    setCurrentStep(2)
  }

 const handleBarberSelect = (barber) => {
  setBookingData(prev => ({
    ...prev,
    barber,
    timeSlot: null   // 🔥 reset old slot (THIS FIXES YOUR ERROR)
  }))
  setCurrentStep(3)
}
  const handleTimeSlotSelect = (timeSlot) => {
    if (!timeSlot.available) {
      toast.error("This slot is already booked")
      return
    }
    setBookingData(prev => ({ ...prev, timeSlot }))
    setCurrentStep(4)
  }

 const handleBookingSubmit = async (e) => {
  e.preventDefault()

  if (!bookingData.date || !bookingData.name || !bookingData.phone) {
    toast.error('Please fill in all details')
    return
  }

  const timeValue =
    bookingData.timeSlot?.slotTime || bookingData.timeSlot?.time

  // 🔥 SAFETY CHECK
  const isStillAvailable = timeSlots.some(
    (slot) => slot.slotTime === timeValue && slot.available
  )

  if (!isStillAvailable) {
    toast.error("Selected slot is no longer available")
    return
  }

  setLoading(true)

  try {
    const bookingPayload = {
      name: bookingData.name,
      phone: bookingData.phone,
      serviceName: bookingData.service.name,
      barberName: bookingData.barber.name,
      dateTime: `${bookingData.date}T${timeValue}:00`,
      status: 'PENDING'
    }

    await bookingsAPI.create(bookingPayload)

    toast.success('Booking created successfully!')

    await fetchInitialData()

    setBookingData({
      service: null,
      barber: null,
      timeSlot: null,
      date: '',
      name: '',
      phone: ''
    })

    setCurrentStep(1)

  } catch (error) {
    console.error(error)
    toast.error('Failed to create booking')
  } finally {
    setLoading(false)
  }
}

  const steps = [
    { number: 1, title: 'Select Service' },
    { number: 2, title: 'Choose Barber' },
    { number: 3, title: 'Pick Time' },
    { number: 4, title: 'Your Details' }
  ]

  if (loading && services.length === 0) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--accent-gold)' }}>
          Book Your Appointment
        </h1>
        <p className="lead" style={{ color: 'var(--text-secondary)' }}>
          Follow the simple steps to book your perfect grooming session
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${
                      currentStep >= step.number ? 'btn-gold' : 'bg-secondary'
                    }`}
                    style={{ width: '50px', height: '50px' }}
                  >
                    {step.number}
                  </div>
                  <small className={currentStep >= step.number ? 'text-gold' : 'text-secondary'}>
                    {step.title}
                  </small>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex-grow-1 mx-3">
                    <div
                      className={`h-1 ${
                        currentStep > step.number ? 'bg-gold' : 'bg-secondary'
                      }`}
                      style={{ width: '100px' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="booking-step">
            <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Choose Your Service</h3>
            <div className="row">
              {services.map((service) => (
                <div key={service.id} className="col-md-4 mb-3">
                  <motion.div className="service-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleServiceSelect(service)}>
                    <h5>{service.name}</h5>
                    <p className="text-gold fw-bold">{service.price}/-</p>
                    <p className="small text-secondary">{service.duration} minutes</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="booking-step">
            <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Select Your Barber</h3>
            <div className="row">
              {barbers.map((barber) => (
                <div key={barber.id} className="col-md-4 mb-3">
                  <motion.div className="barber-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleBarberSelect(barber)}>
                    <h5>{barber.name}</h5>
                    <p className="small text-secondary">{barber.experience}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="booking-step">
            <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Choose Time Slot</h3>
            <div className="mb-4">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                className="form-control"
                value={bookingData.date}
                onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="row">
              {timeSlots.filter(slot => slot.available).map((timeSlot) => (
                <div key={timeSlot.id} className="col-md-3 mb-3">
                  <motion.div className="timeslot-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleTimeSlotSelect(timeSlot)}>
                    <h5>{timeSlot.slotTime}</h5>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
          
        )}

        {currentStep === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="booking-step">
            <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Your Details</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bookingData.name}
                    onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone"
                    required
                  />
                </div>
              </div>

              <div className="glass-card mb-4">
                <h5 className="text-gold mb-3">Booking Summary</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Service:</strong> {bookingData.service?.name}</p>
                    <p><strong>Barber:</strong> {bookingData.barber?.name}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Date:</strong> {bookingData.date}</p>
                    <p><strong>Time:</strong> {bookingData.timeSlot?.slotTime}</p>
                  </div>
                </div>
                <p className="text-gold fw-bold">
                  Total Price: {bookingData.service?.price}
                </p>
              </div>

              <div className="d-flex gap-3">
                <button type="button" className="btn btn-outline-gold" onClick={() => setCurrentStep(3)}>
                  Back
                </button>
                <button type="submit" className="btn btn-gold" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomerBooking
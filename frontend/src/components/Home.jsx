import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { barbersAPI, servicesAPI, timeSlotsAPI } from '../services/api'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    happyCustomers: 0,
    yearsExperience: 0,
    expertBarbers: 0,
    dailyAppointments: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true)

  // 🔥 Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dbStatus = await fetch('http://localhost:8080/api/database/status')
        const statusData = await dbStatus.json()

        setStats({
          happyCustomers: statusData.tableCounts?.bookings || 0,
          yearsExperience: statusData.tableCounts?.barbers || 0,
          expertBarbers: statusData.tableCounts?.barbers || 0,
          dailyAppointments: statusData.tableCounts?.bookings || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // 🔥 Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 🔥 SERVICES FIX (MAIN BUG FIX)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll()

        console.log("API response:", response)

        let data = []

        if (Array.isArray(response)) {
          data = response
        } else if (Array.isArray(response.data)) {
          data = response.data
        }

        setServices(data)

      } catch (error) {
        console.error('Error fetching services:', error)
        setServices([])
      } finally {
        setServicesLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="min-vh-100">

      {/* HERO */}
      <section className="text-center py-5">
        <h1 style={{ color: 'gold' }}>Premium Barber Shop</h1>
        <p>{currentTime.toLocaleTimeString()}</p>
        <Link to="/booking" className="btn btn-gold m-2">Book Now</Link>
      </section>

      {/* SERVICES */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>

          <div className="row">

            {servicesLoading ? (
              <p className="text-center">Loading...</p>

            ) : !Array.isArray(services) || services.length === 0 ? (
              <p className="text-center">No services available</p>

            ) : (
              services.map((service, index) => (
                <div key={service.id} className="col-md-4 mb-4">
                  <div className="glass-card text-center p-3">

                    <div style={{ fontSize: '2rem' }}>
                      {["✂️","🧔","🪒"][index % 3]}
                    </div>

                    {/* ✅ FIXED */}
                    <h5>{service.name}</h5>

                    <p>Duration: {service.duration} min</p>

                    <h6>₹{service.price}</h6>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
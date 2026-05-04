import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { bookingsAPI, barbersAPI, servicesAPI } from '../../services/api'

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalBarbers: 0,
    totalServices: 0,
   
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()

    // 🔥 AUTO REFRESH EVERY 5 SEC
    const interval = setInterval(fetchDashboardData, 5000)
    return () => clearInterval(interval)

  }, [])

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, barbersRes, servicesRes] = await Promise.all([
        bookingsAPI.getAll(),
        barbersAPI.getAll(),
        servicesAPI.getAll()
      ])

      // 🔥 SAFE DATA EXTRACTION
      const bookings = bookingsRes?.data || bookingsRes || []
      const barbers = barbersRes?.data || barbersRes || []
      const services = servicesRes?.data || servicesRes || []

      // 🔥 SORT BOOKINGS (LATEST FIRST)
      const sortedBookings = [...bookings].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      )

      // ✅ FIXED TODAY CALCULATION
      const today = new Date()

      const todayBookingsCount = bookings.filter(b => {
        const bookingDate = new Date(b.dateTime)

        return (
          bookingDate.getDate() === today.getDate() &&
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear()
        )
      }).length

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'PENDING').length,
        totalBarbers: barbers.length,
        totalServices: services.length,
        todayBookings: todayBookingsCount
      })

      // 🔥 LATEST 5 BOOKINGS
      setRecentBookings(sortedBookings.slice(0, 5))

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h2 className="mb-0" style={{ color: 'var(--accent-gold)' }}>
          Dashboard Overview
        </h2>
        <p className="mb-0 text-secondary">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <motion.div className="col-md-3 mb-3" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="stats-card">
            <div className="stats-number">{stats.totalBookings}</div>
            <div>Total Bookings</div>
          </div>
        </motion.div>

        <motion.div className="col-md-3 mb-3" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="stats-card">
            <div className="stats-number">{stats.pendingBookings}</div>
            <div>Pending Bookings</div>
          </div>
        </motion.div>

        <motion.div className="col-md-3 mb-3" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="stats-card">
            <div className="stats-number">{stats.totalBarbers}</div>
            <div>Total Barbers</div>
          </div>
        </motion.div>

      
      </div>

      {/* Recent Bookings */}
      <motion.div className="booking-table" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>
          Recent Bookings
        </h3>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Barber</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.serviceName}</td>
                    <td>{booking.barberName}</td>
                    <td>
                      {booking.dateTime
                        ? new Date(booking.dateTime).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td>
                      <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardOverview
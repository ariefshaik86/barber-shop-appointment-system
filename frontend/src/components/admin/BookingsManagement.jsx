import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { bookingsAPI } from '../../services/api'

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null) // 🔥 NEW

  useEffect(() => {
    fetchBookings()

    const interval = setInterval(fetchBookings, 5000)
    return () => clearInterval(interval)

  }, [])

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll()
      const data = response?.data || response || []

      const sorted = [...data].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      )

      setBookings(sorted)

    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 FIXED FUNCTION
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId)

      await bookingsAPI.updateStatus(bookingId, newStatus)

      // 🔥 INSTANT UI UPDATE (no wait)
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      )

    } catch (error) {
  console.log("FULL ERROR:", error.response)

  const message =
    error.response?.data?.error ||
    error.response?.data ||
    error.message

  alert(message)
}
    finally {
      setUpdatingId(null)
    }
  }

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingsAPI.delete(bookingId)

        // 🔥 INSTANT REMOVE
        setBookings(prev => prev.filter(b => b.id !== bookingId))

      } catch (error) {
        console.error('Failed to delete booking:', error)
        alert("Delete failed")
      }
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      <div className="dashboard-header">
        <h2 className="mb-0" style={{ color: 'var(--accent-gold)' }}>
          Bookings Management
        </h2>
        <p className="mb-0 text-secondary">
          Manage all customer bookings
        </p>
      </div>

      <div className="glass-card mb-4">
        <div className="d-flex gap-2 align-items-center">
          <label className="mb-0">Filter by status:</label>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <motion.div className="booking-table" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Barber</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
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

                    <td>
                      <div className="btn-group" role="group">

                        {booking.status === 'PENDING' && (
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={updatingId === booking.id}
                            onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                          >
                            {updatingId === booking.id ? 'Updating...' : 'Cancel'}
                          </button>
                        )}

                        {booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
                          <button
                            className="btn btn-sm btn-info"
                            disabled={updatingId === booking.id}
                            onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                          >
                            {updatingId === booking.id ? 'Updating...' : 'Complete'}
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
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

export default BookingsManagement
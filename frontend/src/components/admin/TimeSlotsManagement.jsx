import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { timeSlotsAPI } from '../../services/api'

const TimeSlotsManagement = () => {
  const [timeSlots, setTimeSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTimeSlot, setNewTimeSlot] = useState('')

  useEffect(() => {
    fetchTimeSlots()

    const interval = setInterval(fetchTimeSlots, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchTimeSlots = async () => {
    try {
      const res = await timeSlotsAPI.getAll()
      const data = res?.data || res || []

      // ✅ FIXED SORTING
      const sorted = [...data].sort((a, b) =>
        new Date(`1970-01-01T${a.slotTime}`) - new Date(`1970-01-01T${b.slotTime}`)
      )

      setTimeSlots(sorted)
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTimeSlot = async (e) => {
    e.preventDefault()

    if (!newTimeSlot) {
      alert("Enter time")
      return
    }

    try {
      await timeSlotsAPI.create({
        slotTime: newTimeSlot,
        available: true
      })

      setNewTimeSlot('')
      setShowAddForm(false)
      fetchTimeSlots()

    } catch (error) {
      console.error('Failed to add time slot:', error)

      // ✅ HANDLE DUPLICATE ERROR
      if (error.response?.status === 409) {
        alert("Slot already exists")
      } else {
        alert("Failed to add slot")
      }
    }
  }

  const toggleAvailability = async (slotId) => {
    try {
      await timeSlotsAPI.toggleAvailability(slotId)
      fetchTimeSlots()
    } catch (error) {
      console.error('Failed to toggle availability:', error)
      alert("Update failed")
    }
  }

  const deleteTimeSlot = async (slotId) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      try {
        await timeSlotsAPI.delete(slotId)
        fetchTimeSlots()
      } catch (error) {
        console.error('Failed to delete time slot:', error)
        alert("Delete failed")
      }
    }
  }

  const generateDefaultTimeSlots = async () => {
    const defaultSlots = [
      '09:00','09:30','10:00','10:30','11:00','11:30',
      '12:00','12:30','13:00','13:30','14:00','14:30',
      '15:00','15:30','16:00','16:30','17:00','17:30'
    ]

    try {
      for (const slotTime of defaultSlots) {
        try {
          await timeSlotsAPI.create({ slotTime, available: true })
        } catch (err) {
          if (err.response?.status !== 409) {
            throw err
          }
        }
      }

      fetchTimeSlots()

    } catch (error) {
      console.error('Failed to generate default time slots:', error)
      alert("Generation failed")
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <div className="dashboard-header">
        <h2 className="mb-0" style={{ color: 'var(--accent-gold)' }}>
          Time Slots Management
        </h2>
        <p className="mb-0 text-secondary">
          Manage available appointment times
        </p>
      </div>

      <motion.div className="glass-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0" style={{ color: 'var(--accent-gold)' }}>
            Time Slots
          </h4>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-gold"
              onClick={generateDefaultTimeSlots}
              disabled={timeSlots.length > 0}
            >
              Generate Default Slots
            </button>

            <button
              className="btn btn-gold"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : 'Add Time Slot'}
            </button>
          </div>
        </div>
      </motion.div>

      {showAddForm && (
        <motion.div className="glass-card mb-4">
          <h4 style={{ color: 'var(--accent-gold)' }}>
            Add New Time Slot
          </h4>

          <form onSubmit={handleAddTimeSlot}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="09:00"
                  required
                />
              </div>

              <div className="col-md-6">
                <button className="btn btn-gold">
                  Add
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      )}

      <div className="row">
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <motion.div
              key={slot.id}
              className="col-md-3 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`glass-card ${!slot.available ? 'opacity-50' : ''}`}>

                <div className="d-flex justify-content-between">
                  <h5>{slot.slotTime}</h5>
                  <span className={`badge ${slot.available ? 'bg-success' : 'bg-danger'}`}>
                    {slot.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className={`btn btn-sm ${slot.available ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => toggleAvailability(slot.id)}
                  >
                    {slot.available ? 'Disable' : 'Enable'}
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTimeSlot(slot.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center">No time slots configured</p>
        )}
      </div>

    </motion.div>
  )
}

export default TimeSlotsManagement
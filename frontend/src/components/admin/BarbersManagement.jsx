import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { barbersAPI } from '../../services/api'

const BarbersManagement = () => {
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBarber, setNewBarber] = useState({
    name: '',
    experience: '',
    imageUrl: ''
  })

  useEffect(() => {
    fetchBarbers()

    // 🔥 AUTO REFRESH
    const interval = setInterval(fetchBarbers, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchBarbers = async () => {
    try {
      const res = await barbersAPI.getAll()

      // 🔥 SAFE DATA EXTRACTION
      const data = res?.data || res || []

      setBarbers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch barbers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBarber = async (e) => {
    e.preventDefault()

    if (!newBarber.name || !newBarber.experience) {
      alert("Please fill all required fields")
      return
    }

    try {
      await barbersAPI.create(newBarber)

      setNewBarber({ name: '', experience: '', imageUrl: '' })
      setShowAddForm(false)

      fetchBarbers()
    } catch (error) {
      console.error('Failed to add barber:', error)
      alert("Failed to add barber")
    }
  }

  const deleteBarber = async (barberId) => {
    if (window.confirm('Are you sure you want to delete this barber?')) {
      try {
        await barbersAPI.delete(barberId)
        fetchBarbers()
      } catch (error) {
        console.error('Failed to delete barber:', error)
        alert("Delete failed")
      }
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
          Barbers Management
        </h2>
        <p className="mb-0 text-secondary">
          Manage your barbers
        </p>
      </div>

      <motion.div className="glass-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0" style={{ color: 'var(--accent-gold)' }}>
            Barbers List
          </h4>

          <button
            className="btn btn-gold"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Barber'}
          </button>
        </div>
      </motion.div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div className="glass-card mb-4">
          <h4 className="mb-3" style={{ color: 'var(--accent-gold)' }}>
            Add New Barber
          </h4>

          <form onSubmit={handleAddBarber}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newBarber.name}
                  onChange={(e) =>
                    setNewBarber(prev => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Experience</label>
                <input
                  type="text"
                  className="form-control"
                  value={newBarber.experience}
                  onChange={(e) =>
                    setNewBarber(prev => ({ ...prev, experience: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={newBarber.imageUrl}
                  onChange={(e) =>
                    setNewBarber(prev => ({ ...prev, imageUrl: e.target.value }))
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-gold">
              Add Barber
            </button>
          </form>
        </motion.div>
      )}

      {/* Grid */}
      <div className="row">
        {barbers.length > 0 ? (
          barbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              className="col-md-4 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card">

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <h5>{barber.name}</h5>
                    <p className="text-secondary">{barber.experience}</p>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteBarber(barber.id)}
                  >
                    Delete
                  </button>
                </div>

                {barber.imageUrl && (
                  <img
                    src={barber.imageUrl}
                    alt={barber.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                  />
                )}

              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center">No barbers available</p>
        )}
      </div>

    </motion.div>
  )
}

export default BarbersManagement
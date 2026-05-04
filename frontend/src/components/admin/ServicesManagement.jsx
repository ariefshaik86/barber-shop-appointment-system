import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { servicesAPI } from '../../services/api'

const ServicesManagement = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: ''
  })

  useEffect(() => {
    fetchServices()

    // 🔥 AUTO REFRESH
    const interval = setInterval(fetchServices, 5000)
    return () => clearInterval(interval)
  }, [])

  // 🔥 Fetch Services
  const fetchServices = async () => {
    try {
      const res = await servicesAPI.getAll()

      // 🔥 SAFE DATA EXTRACTION
      const data = res?.data || res || []

      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 VALIDATION
  const validateForm = () => {
    if (!formData.name.trim()) return "Service name required"
    if (!formData.price || formData.price <= 0) return "Invalid price"
    if (!formData.duration || formData.duration <= 0) return "Invalid duration"
    return null
  }

  // 🔥 Add Service
  const handleAddService = async (e) => {
    e.preventDefault()

    const errorMsg = validateForm()
    if (errorMsg) {
      alert(errorMsg)
      return
    }

    try {
      await servicesAPI.create(formData)
      resetForm()
      fetchServices()
    } catch (error) {
      console.error('Error adding service:', error)
      alert("Add failed")
    }
  }

  // 🔥 Update Service
  const handleUpdateService = async (e) => {
    e.preventDefault()

    const errorMsg = validateForm()
    if (errorMsg) {
      alert(errorMsg)
      return
    }

    try {
      await servicesAPI.update(editingService.id, formData)
      resetForm()
      fetchServices()
    } catch (error) {
      console.error('Error updating service:', error)
      alert("Update failed")
    }
  }

  // 🔥 Delete Service
  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return

    try {
      await servicesAPI.delete(id)
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert("Delete failed")
    }
  }

  // 🔥 Start Edit
  const startEdit = (service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      price: service.price,
      duration: service.duration
    })
    setShowAddForm(true)
  }

  // 🔥 Reset Form
  const resetForm = () => {
    setFormData({ name: '', price: '', duration: '' })
    setEditingService(null)
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: '#d4af37' }}>Services Management</h2>
          <p className="text-muted">Manage barber shop services</p>
        </div>

        <button
          className="btn btn-warning"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {/* FORM */}
      {showAddForm && (
        <motion.div className="card shadow mb-4 p-4">
          <h5>
            {editingService ? 'Edit Service' : 'Add Service'}
          </h5>

          <form onSubmit={editingService ? handleUpdateService : handleAddService}>
            <div className="row">

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  placeholder="Service Name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  placeholder="Duration"
                  className="form-control"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                />
              </div>

            </div>

            <button className="btn btn-warning me-2">
              {editingService ? 'Update' : 'Add'}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </motion.div>
      )}

      {/* TABLE */}
      <div className="card shadow p-3">
        <div className="table-responsive">
          <table className="table table-hover">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.length > 0 ? (
                services.map((s, index) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>₹{s.price}</td>
                    <td>{s.duration} min</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => startEdit(s)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteService(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No services available
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </motion.div>
  )
}

export default ServicesManagement
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingSpinner from './LoadingSpinner'
import { servicesAPI } from '../services/api' // ✅ IMPORTANT

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll()

      console.log("API response:", response)

      // ✅ Always convert to array
      const data = Array.isArray(response)
        ? response
        : response.data

      setServices(Array.isArray(data) ? data : [])

    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Services', icon: '💈' },
    { id: 'haircuts', name: 'Haircuts', icon: '✂️' },
    { id: 'beard', name: 'Beard Services', icon: '🧔' },
    { id: 'packages', name: 'Packages', icon: '🎁' }
  ]

  // ✅ SAFE FILTER
  const filteredServices = Array.isArray(services)
    ? services.filter(service => {
        if (selectedCategory === 'all') return true
        if (selectedCategory === 'haircuts') return service.name?.toLowerCase().includes('cut')
        if (selectedCategory === 'beard') return service.name?.toLowerCase().includes('beard')
        if (selectedCategory === 'packages') return service.name?.toLowerCase().includes('package')
        return true
      })
    : []

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* Hero */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, var(--primary-black), var(--secondary-black))' }}>
        <div className="container text-center">
          <h1 style={{ color: 'var(--accent-gold)' }}>Our Premium Services</h1>
          <p className="text-secondary">Professional grooming services</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4">
        <div className="container text-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`btn m-1 ${selectedCategory === cat.id ? 'btn-gold' : 'btn-outline-gold'}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-5">
        <div className="container">

          {loading ? (
            <LoadingSpinner message="Loading services..." />
          ) : filteredServices.length === 0 ? (
            <p className="text-center">No services found</p>
          ) : (
            <div className="row g-4">
              {filteredServices.map((service, index) => (
                <div key={service.id} className="col-md-4">
                  <div className="glass-card text-center p-4">

                    <div style={{ fontSize: '3rem' }}>
                      {["✂️","🧔","🪒","💈","👑"][index % 5]}
                    </div>

                    <h5 style={{ color: 'var(--accent-gold)' }}>
                      {service.name}
                    </h5>

                    <p className="text-secondary">
                      Duration: {service.duration} min
                    </p>

                    <h6 style={{ color: 'var(--accent-gold)' }}>
                      ₹{service.price}
                    </h6>

                    <Link
                      to="/booking"
                      state={{ service }}
                      className="btn btn-gold mt-2"
                    >
                      Book Now
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </motion.div>
  )
}

export default Services
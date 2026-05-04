import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll contact you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      })
      setLoading(false)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Our Shop',
      details: '123 Premium Street, Downtown District, City, State 12345',
      action: 'Get Directions'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '(555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: 'info@premiumbarbershop.com',
      action: 'Send Email'
    },
    {
      icon: '📅',
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-8PM, Sat: 8AM-6PM, Sun: 10AM-4PM',
      action: 'Book Appointment'
    }
  ]

  const services = [
    'Classic Haircut',
    'Beard Design & Trim',
    'Hot Towel Shave',
    'Haircut & Beard',
    "Kids' Cut",
    'Executive Package'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, var(--primary-black) 0%, var(--secondary-black) 100%)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-2 fw-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              Get in Touch
            </h1>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
              We'd love to hear from you and help with your grooming needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>
              Contact Information
            </h2>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
              Multiple ways to reach us for your convenience
            </p>
          </motion.div>

          <div className="row g-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="glass-card text-center h-100">
                  <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                    {info.icon}
                  </div>
                  <h5 className="text-gold mb-2">{info.title}</h5>
                  <p className="text-secondary mb-3">{info.details}</p>
                  <button className="btn btn-outline-gold btn-sm">
                    {info.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-5" style={{ background: 'rgba(212, 175, 55, 0.05)' }}>
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>
                Send us a Message
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Have questions or want to book a consultation? Fill out the form below.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Service Interest</label>
                    <select
                      name="service"
                      className="form-select"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us about your grooming needs or questions..."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-gold w-100"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              className="col-lg-6"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-card">
                <h4 className="text-gold mb-3">Quick Contact</h4>
                <div className="mb-3">
                  <h5 className="text-gold mb-2">📞 Phone</h5>
                  <p className="text-secondary mb-0">
                    <strong>Main:</strong> (555) 123-4567<br />
                    <strong>WhatsApp:</strong> (555) 987-6543
                  </p>
                </div>
                <div className="mb-3">
                  <h5 className="text-gold mb-2">✉️ Email</h5>
                  <p className="text-secondary mb-0">
                    <strong>General:</strong> info@premiumbarbershop.com<br />
                    <strong>Bookings:</strong> bookings@premiumbarbershop.com
                  </p>
                </div>
                <div className="mb-3">
                  <h5 className="text-gold mb-2">📍 Location</h5>
                  <p className="text-secondary mb-0">
                    123 Premium Street<br />
                    Downtown District<br />
                    City, State 12345<br />
                    <small>Near Central Metro Station</small>
                  </p>
                </div>
                <div>
                  <h5 className="text-gold mb-2">🕐 Hours</h5>
                  <p className="text-secondary mb-0">
                    <strong>Mon-Fri:</strong> 9:00 AM - 8:00 PM<br />
                    <strong>Saturday:</strong> 8:00 AM - 6:00 PM<br />
                    <strong>Sunday:</strong> 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>
              Find Us Easily
            </h2>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
              Convenient location in the heart of downtown
            </p>
          </motion.div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="map-placeholder"
              style={{
                height: '400px',
                background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(10, 10, 10, 0.2))',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <div className="text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                <h5>Interactive Map</h5>
                <p>123 Premium Street, Downtown District</p>
                <button className="btn btn-outline-gold mt-3">
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Styles */}
      <style jsx>{`
        .contact-form .form-control,
        .contact-form .form-select {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
        }
        
        .contact-form .form-control:focus,
        .contact-form .form-select:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 0.2rem rgba(212, 175, 55, 0.25);
        }
        
        .map-placeholder {
          border: 2px dashed var(--glass-border);
        }
      `}</style>
    </motion.div>
  )
}

export default Contact

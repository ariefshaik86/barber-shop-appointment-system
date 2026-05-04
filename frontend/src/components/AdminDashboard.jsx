import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { bookingsAPI, barbersAPI, servicesAPI, timeSlotsAPI } from '../services/api'
import DashboardOverview from './admin/DashboardOverview'
import BookingsManagement from './admin/BookingsManagement'
import BarbersManagement from './admin/BarbersManagement'
import ServicesManagement from './admin/ServicesManagement'
import TimeSlotsManagement from './admin/TimeSlotsManagement'

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'barbers', label: 'Barbers', icon: '✂️' },
    { id: 'services', label: 'Services', icon: '💈' },
    { id: 'timeslots', label: 'Time Slots', icon: '⏰' },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'bookings':
        return <BookingsManagement />
      case 'barbers':
        return <BarbersManagement />
      case 'services':
        return <ServicesManagement />
      case 'timeslots':
        return <TimeSlotsManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="admin-dashboard min-vh-100 d-flex">
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <motion.button
          className="admin-mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <span className="admin-toggle-icon">{sidebarOpen ? '✕' : '☰'}</span>
        </motion.button>
      )}

      {/* Sidebar */}
      <motion.div
        className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="admin-sidebar-header">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className={`admin-title ${!sidebarOpen && 'd-none'}`}>
              Admin Panel
            </h4>
            {!isMobile && (
              <button
                className="admin-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? '◀' : '▶'}
              </button>
            )}
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`admin-nav-btn ${
                activeSection === item.id ? 'active' : ''
              }`}
              onClick={() => {
                setActiveSection(item.id)
                if (isMobile) setSidebarOpen(false)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <span className="admin-nav-label">{item.label}</span>
              )}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          className="admin-mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <motion.div
          className="admin-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠', badge: null },
    { path: '/booking', label: 'Book Now', icon: '📅', badge: null },
    { path: '/services', label: 'Services', icon: '💈', badge: null },
    { path: '/gallery', label: 'Gallery', icon: '🖼️', badge: null },
    { path: '/contact', label: 'Contact', icon: '📞', badge: null }
  ]

  const isActivePath = (path) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <motion.div 
        className="top-announcement"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="announcement-content">
            <span className="announcement-item">
              <span className="announcement-icon">📞</span>
              <span className="announcement-text">Call Us: (555) 123-4567</span>
            </span>
            <span className="announcement-divider">•</span>
            <span className="announcement-item">
              <span className="announcement-icon">✉️</span>
              <span className="announcement-text">info@premiumbarbershop.com</span>
            </span>
            <span className="announcement-divider">•</span>
            <span className="announcement-item">
              <span className="announcement-icon">📍</span>
              <span className="announcement-text">123 Premium Street, Downtown</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className={`modern-navbar safe-area-top ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="navbar-container">
          <div className="navbar-brand-container">
            <Link 
              to="/" 
              className="modern-brand"
            >
              <div className="brand-icon">✂️</div>
              <div className="brand-text">
                <span className="brand-main">Premium</span>
                <span className="brand-sub">Barber Shop</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav-container">
            <div className="modern-nav desktop-nav">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  className="nav-item-modern"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link-modern ${
                      isActivePath(item.path) ? 'active' : ''
                    }`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                    {isActivePath(item.path) && (
                      <motion.div
                        className="nav-indicator"
                        layoutId="activeTab"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="hamburger-icon"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div className="mobile-brand">
                  <span className="brand-icon">✂️</span>
                  <span className="brand-main">Premium</span>
                  <span className="brand-sub">Barber Shop</span>
                </div>
                <motion.button
                  className="mobile-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="mobile-nav-items">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    className="mobile-nav-item"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${
                        isActivePath(item.path) ? 'active' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">{item.icon}</span>
                      <span className="mobile-nav-label">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

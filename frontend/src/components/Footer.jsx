import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-gold mb-3">Premium Barber Shop</h5>
            <p className="text-secondary mb-2">
              Your trusted destination for professional grooming services
            </p>
            <div className="contact-info">
              <div className="mb-2">
                <span className="text-gold me-2">📍</span>
                <span>123 Premium Street, Downtown District</span>
              </div>
              <div className="mb-2">
                <span className="text-gold me-2">📞</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="mb-2">
                <span className="text-gold me-2">✉️</span>
                <span>info@premiumbarbershop.com</span>
              </div>
              <div>
                <span className="text-gold me-2">🕐</span>
                <span>Mon-Fri: 9AM-8PM, Sat: 8AM-6PM, Sun: 10AM-4PM</span>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-gold mb-3">Quick Links</h5>
            <div className="footer-links">
              <div className="mb-2">
                <a href="/booking" className="footer-link">
                  <span className="me-2">📅</span>
                  Book Appointment
                </a>
              </div>
              <div className="mb-2">
                <a href="/services" className="footer-link">
                  <span className="me-2">💈</span>
                  View Services
                </a>
              </div>
              <div className="mb-2">
                <a href="/contact" className="footer-link">
                  <span className="me-2">📞</span>
                  Contact Us
                </a>
              </div>
              <div className="mb-2">
                <a href="/about" className="footer-link">
                  <span className="me-2">ℹ️</span>
                  About Us
                </a>
              </div>
              <div className="mb-2">
                <a href="/admin" className="footer-link">
                  <span className="me-2">📞</span>
                  Admin
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-gold mb-3">Newsletter</h5>
            <p className="text-secondary mb-3">
              Subscribe for exclusive offers and grooming tips
            </p>
            <form className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn btn-gold">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <h6 className="text-gold mb-3">Follow Us</h6>
            <div className="social-links">
              <a href="#" className="social-link me-3">📘</a>
              <a href="#" className="social-link me-3">📷</a>
              <a href="#" className="social-link me-3">🐦</a>
              <a href="#" className="social-link me-3">💼</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-0 text-secondary">
                  © {currentYear} Premium Barber Shop. All rights reserved.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="payment-methods">
                  <span className="text-secondary me-2">We Accept:</span>
                  <span className="payment-icons">
                    <span className="me-2">💳</span>
                    <span className="me-2">💰</span>
                    <span>📱</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

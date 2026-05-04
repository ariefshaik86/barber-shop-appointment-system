// Debug version of Home component to identify issues
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HomeDebug = () => {
  console.log('Home component mounted')
  
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    happyCustomers: 0,
    yearsExperience: 0,
    expertBarbers: 0,
    dailyAppointments: 0
  })
  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true)

  // Test API connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing API connection...')
        const response = await fetch('http://localhost:8080/api/health')
        console.log('Health check response:', response.status, response.ok)
        
        if (response.ok) {
          console.log('✅ API connection successful')
        } else {
          console.log('❌ API connection failed')
        }
      } catch (error) {
        console.error('Connection test error:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-vh-100">
      <div className="container text-center py-5">
        <h1 className="text-white mb-4">Home Debug Component</h1>
        <p className="text-secondary">This is a debug version to test API connection</p>
        
        <div className="glass-card">
          <h3>API Connection Test</h3>
          <p>Check browser console for connection status</p>
        </div>
        
        <div className="glass-card">
          <h3>Current Status</h3>
          <p>Time: {currentTime.toLocaleTimeString()}</p>
          <p>Services: {services.length} loaded</p>
          <p>Stats: {JSON.stringify(stats)}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeDebug

import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'spinner-sm',
    medium: 'spinner-md',
    large: 'spinner-lg'
  }

  return (
    <div className="loading-overlay">
      <motion.div
        className="loading-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`spinner ${sizeClasses[size]}`}>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        {message && (
          <motion.p
            className="loading-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
      
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .loading-content {
          text-align: center;
        }
        
        .spinner {
          position: relative;
          width: 60px;
          height: 60px;
        }
        
        .spinner-sm {
          width: 40px;
          height: 40px;
        }
        
        .spinner-md {
          width: 60px;
          height: 60px;
        }
        
        .spinner-lg {
          width: 80px;
          height: 80px;
        }
        
        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid var(--accent-gold);
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1.5s linear infinite;
        }
        
        .spinner-ring:nth-child(1) {
          animation-delay: 0.5s;
        }
        
        .spinner-ring:nth-child(2) {
          animation-delay: 1s;
        }
        
        .spinner-ring:nth-child(3) {
          animation-delay: 1.5s;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
            border-top-color: var(--accent-gold);
          }
          25% {
            transform: rotate(90deg);
            border-top-color: transparent;
            border-right-color: var(--accent-gold);
          }
          50% {
            transform: rotate(180deg);
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: var(--accent-gold);
          }
          75% {
            transform: rotate(270deg);
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-left-color: var(--accent-gold);
          }
          100% {
            transform: rotate(360deg);
            border-top-color: var(--accent-gold);
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-left-color: transparent;
          }
        }
        
        .loading-message {
          color: var(--accent-gold);
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 2rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner

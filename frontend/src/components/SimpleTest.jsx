import React from 'react'

const SimpleTest = () => {
  console.log('SimpleTest component mounted')
  
  return (
    <div style={{
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.8)',
      color: 'white',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h1 style={{ color: '#007bff', marginBottom: '10px' }}>
        Frontend Test Component
      </h1>
      <p style={{ marginBottom: '10px' }}>
        If you can see this text, the frontend is working correctly.
      </p>
      <p style={{ color: '#28a745', marginBottom: '10px' }}>
        Check browser console for any error messages.
      </p>
      <div style={{
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '4px',
        marginTop: '10px'
      }}>
        <h3>API Test</h3>
        <button 
          onClick={() => console.log('Button clicked')}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test API Connection
        </button>
      </div>
    </div>
  )
}

export default SimpleTest

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any component below and log them
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          padding: '20px',
          background: 'rgba(255, 0, 0, 0.1)',
          borderRadius: '8px',
          color: 'white'
        }}>
          <h2 style={{ color: '#ff6b6b', marginBottom: '10px' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>
            Error: {this.state.error?.message || 'Unknown error occurred'}
          </p>
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', color: '#ff6b6b' }}>
              Technical Details
            </summary>
            <pre style={{ 
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#fff',
              overflow: 'auto'
            }}>
              {this.state.error && this.state.error.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

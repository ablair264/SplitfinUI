import React from 'react';
import { Link } from 'react-router-dom';

const SimpleShowcase: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2a 50%, #2c3e50 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <img 
        src="/splitfin-white.png" 
        alt="Splitfin" 
        style={{ height: '80px', marginBottom: '2rem' }}
      />
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #79d5e9, #4daeac)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}>
        SplitfinUI
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '3rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Premium React dashboard components with stunning design
      </p>
      
      <div style={{
        background: 'rgba(26, 31, 42, 0.6)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(121, 213, 233, 0.2)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#79d5e9'
        }}>
          🚀 Try the Live Demo
        </h2>
        
        <div style={{
          background: 'rgba(121, 213, 233, 0.1)',
          border: '1px solid rgba(121, 213, 233, 0.3)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontFamily: 'Courier New, monospace'
        }}>
          <strong style={{ color: '#79d5e9' }}>Demo Login:</strong><br/>
          Email: demo@example.com<br/>
          Password: demo123
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/login" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #79d5e9, #4daeac)',
              color: '#0f1419',
              transition: 'all 0.3s ease'
            }}
          >
            🎯 Live Dashboard Demo
          </Link>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        maxWidth: '800px',
        width: '100%'
      }}>
        {[
          { icon: '📊', title: 'Rich Components', desc: 'MetricCards, Charts, Tables' },
          { icon: '🎨', title: 'Customizable', desc: 'Multiple color themes' },
          { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
          { icon: '⚡', title: 'TypeScript', desc: 'Full type safety' }
        ].map((feature, i) => (
          <div key={i} style={{
            background: 'rgba(26, 31, 42, 0.4)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(121, 213, 233, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
            <h3 style={{ color: '#79d5e9', marginBottom: '0.5rem', fontSize: '1rem' }}>{feature.title}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', margin: 0 }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleShowcase;
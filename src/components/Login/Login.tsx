// src/components/Login.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'

// Types for props (making component configurable)
interface LoginProps {
  onLogin?: (email: string, password: string) => Promise<void>
  onSocialLogin?: (provider: 'google' | 'github' | 'apple') => Promise<void>
  logoSrc?: string
  logoAlt?: string
  title?: string
  subtitle?: string
  helpText?: string
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSocialLogin?: boolean
  showDemoHint?: boolean
  demoCredentials?: {
    email: string
    password: string
  }
  additionalLinks?: Array<{
    text: string
    href: string
    label?: string
  }>
}

// Default demo credentials
const DEFAULT_DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123'
}

export default function Login({
  onLogin,
  onSocialLogin,
  logoSrc = '/logos/splitfinrow.png',
  logoAlt = 'Company Logo',
  title,
  subtitle = 'Access your dashboard',
  helpText = 'Need help? Contact support for assistance.',
  showRememberMe = true,
  showForgotPassword = true,
  showSocialLogin = true,
  showDemoHint = true,
  demoCredentials = DEFAULT_DEMO_CREDENTIALS,
  additionalLinks = []
}: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (onLogin) {
        await onLogin(email, password)
      } else {
        // Default behavior - simulate login
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Login attempted with:', { email, password, rememberMe })
        // In a real app, you would redirect or update app state here
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github' | 'apple') => {
    try {
      if (onSocialLogin) {
        await onSocialLogin(provider)
      } else {
        // Default behavior - simulate social login
        console.log(`Social login attempted with: ${provider}`)
        // In a real app, you would integrate with the respective OAuth provider
      }
    } catch (err: any) {
      console.error('Social login error:', err)
      setError(err.message || `${provider} login failed. Please try again.`)
    }
  }

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email)
    setPassword(demoCredentials.password)
  }

  return (
    <div className="login-page">
      {/* Gradient overlay for animated background */}
      <div className="gradient-overlay"></div>
      
      {/* Single optimized floating accent element */}
      <div className="floating-accent"></div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                className="logo-image"
              />
            </div>
            <p className="login-subtitle">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <div className="error-icon">⚠️</div>
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-container">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {(showRememberMe || showForgotPassword) && (
              <div className="form-options">
                {showRememberMe && (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    Remember me
                  </label>
                )}
                {showForgotPassword && (
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot password?
                  </Link>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="button-loader">
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #0f1419',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="button-arrow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {showSocialLogin && (
            <>
              <div className="divider">
                <span>Or continue with</span>
              </div>

              <div className="social-login-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  type="button"
                  className="social-icon-button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  aria-label="Continue with Google"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#54b3b4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#54b3b4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#54b3b4" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#54b3b4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>

                <button 
                  type="button"
                  className="social-icon-button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  aria-label="Continue with GitHub"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#54b3b4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>

                <button 
                  type="button"
                  className="social-icon-button"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  aria-label="Continue with Apple"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#54b3b4">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </button>
              </div>
            </>
          )}

          <div className="login-footer">
            <p className="help-text">{helpText}</p>
            
            {additionalLinks.length > 0 && (
              <div className="additional-links">
                <p className="link-text">Additional Options</p>
                {additionalLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.href} 
                    className="additional-link"
                    aria-label={link.label}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            )}

            {showDemoHint && (
              <div className="demo-hint">
                <p className="demo-text">
                  <strong>Demo:</strong> Use{' '}
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--login-accent)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      font: 'inherit'
                    }}
                  >
                    {demoCredentials.email}
                  </button>{' '}
                  with password <strong>{demoCredentials.password}</strong> to try the demo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
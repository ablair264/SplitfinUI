import React from 'react'
import Login from '../components/Login/Login'

const LoginDemo: React.FC = () => {
  const handleLogin = async (email: string, password: string) => {
    // Demo login simulation
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert(`Demo login successful! Email: ${email}`)
  }

  const handleSocialLogin = async (provider: string) => {
    alert(`Demo ${provider} login initiated!`)
  }

  return (
    <div className="login-demo">
      <Login
        onLogin={handleLogin}
        onSocialLogin={handleSocialLogin}
        logoSrc="/logos/splitfinrow.png"
        title="Welcome to SplitFin UI"
        subtitle="Experience our beautiful login component"
        showDemoHint={true}
        demoCredentials={{
          email: 'demo@splitfinui.com',
          password: 'demo123'
        }}
        additionalLinks={[
          { text: 'Documentation', href: '/docs', label: 'View Documentation' },
          { text: 'Pricing', href: '/pricing', label: 'View Pricing' }
        ]}
      />
    </div>
  )
}

export default LoginDemo
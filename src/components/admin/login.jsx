import { useState } from 'react';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Send the credentials to your secure backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(); 
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch  {
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2 className="admin-login-title">Admin Portal</h2>
        
        {error && (
          <div className="admin-error-msg">
            {error}
          </div>
        )}
        
        <div className="admin-form-group">
          <label className="admin-label">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-input"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="admin-form-group last">
          <label className="admin-label">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
            disabled={isLoading}
            required
          />
        </div>
        
        <button type="submit" className="admin-submit-btn" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
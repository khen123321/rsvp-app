import { useState } from 'react';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Updated credentials
    if (username === 'testadmin123' && password === 'testadmin123') {
      onLoginSuccess(); 
    } else {
      setError('Invalid username or password');
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
            required
          />
        </div>
        
        <button type="submit" className="admin-submit-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
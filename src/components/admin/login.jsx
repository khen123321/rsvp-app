import { useState } from 'react';

const inputClass = 'w-full rounded border border-[#ccc] p-3 text-base box-border focus:border-[#888] focus:outline-none';

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
    } catch {
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#f9f9f9] font-['Inter',system-ui,-apple-system,sans-serif]">
      <form onSubmit={handleLogin} className="w-80 rounded-lg border border-[#ddd] bg-white p-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#333]">Admin Portal</h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-[0.9rem] text-[#555]">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} disabled={isLoading} required />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-[0.9rem] text-[#555]">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} disabled={isLoading} required />
        </div>

        <button type="submit" className="w-full cursor-pointer rounded border-0 bg-[#333] p-3 text-base font-bold text-white transition-colors duration-200 ease-in-out hover:bg-[#555]" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;

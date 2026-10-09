import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // Mock authentication
    onLogin();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition text-gray-800"
            />
          </div>

          <div className="mb-8">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition text-gray-800"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded transition mb-4"
          >
            Sign in
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-gray-800 text-sm hover:text-blue-500 transition">
            Reset Link?
          </a>
        </div>
      </div>
    </div>
  );
}

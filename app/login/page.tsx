'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCurrentUser, getUsers } from '@/lib/storage';
import { getUserByUsername, verifyPassword } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username.trim()) {
        setError('Username is required');
        setIsLoading(false);
        return;
      }

      if (!password) {
        setError('Password is required');
        setIsLoading(false);
        return;
      }

      // Get user from storage
      const users = getUsers();
      const user = getUserByUsername(username, users);

      if (!user) {
        setError('Username or password is incorrect');
        setIsLoading(false);
        return;
      }

      // Verify password
      if (!user.passwordHash || !verifyPassword(password, user.passwordHash)) {
        setError('Username or password is incorrect');
        setIsLoading(false);
        return;
      }

      // Check if user is banned
      if (user.isBanned) {
        setError('This account has been banned');
        setIsLoading(false);
        return;
      }

      // Set current user
      setCurrentUser(user);
      router.push('/');
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (name: string) => {
    setError('');
    setIsLoading(true);

    try {
      const users = getUsers();
      const user = getUserByUsername(name, users);

      if (!user) {
        setError('User not found');
        setIsLoading(false);
        return;
      }

      setCurrentUser(user);
      router.push('/');
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">✨</div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Welcome to DevHub</h1>
            <p className="text-gray-400">Join the developer community</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  error ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  error ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
            </div>

            {error && <div className="text-pink-400 text-sm font-semibold bg-pink-500/10 p-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Logging in...' : '🚀 Launch In'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#0f0f23] text-gray-400">Demo accounts (password: password123)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'TechGuru', icon: '👨‍💻', color: 'from-blue-500 to-cyan-500' },
              { name: 'DesignNinja', icon: '🎨', color: 'from-pink-500 to-rose-500' },
              { name: 'CodeMaster', icon: '⚙️', color: 'from-purple-500 to-indigo-500' },
              { name: 'WebWizard', icon: '🧙', color: 'from-orange-500 to-yellow-500' },
            ].map((user) => (
              <button
                key={user.name}
                type="button"
                onClick={() => handleQuickLogin(user.name)}
                disabled={isLoading}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`text-2xl w-12 h-12 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {user.icon}
                  </div>
                  <span className="text-xs">{user.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <p className="text-sm text-purple-200">
              <strong className="text-purple-300">🔒 Demo Mode:</strong> No password required. Your session is stored locally.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors">
              Continue as guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


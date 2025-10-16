'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  validateUsername,
  validatePassword,
  validateEmail,
  createUser,
  userExists,
} from '@/lib/auth';
import { addUser, setCurrentUser, getUsers } from '@/lib/storage';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate username
      const usernameValidation = validateUsername(formData.username);
      if (!usernameValidation.valid) {
        setErrors((prev) => ({ ...prev, username: usernameValidation.error || '' }));
        setIsLoading(false);
        return;
      }

      // Check if username exists
      const users = getUsers();
      if (userExists(formData.username, users)) {
        setErrors((prev) => ({ ...prev, username: 'Username already taken' }));
        setIsLoading(false);
        return;
      }

      // Validate password
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        setErrors((prev) => ({ ...prev, password: passwordValidation.error || '' }));
        setIsLoading(false);
        return;
      }

      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
        setIsLoading(false);
        return;
      }

      // Validate email if provided
      if (formData.email) {
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) {
          setErrors((prev) => ({ ...prev, email: emailValidation.error || '' }));
          setIsLoading(false);
          return;
        }
      }

      // Create user
      const newUser = createUser(
        formData.username,
        formData.password,
        formData.email || undefined,
        'user'
      );

      // Add user to storage
      addUser(newUser);

      // Set as current user
      setCurrentUser(newUser);

      // Redirect to home
      router.push('/');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'An error occurred',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Join DevHub</h1>
            <p className="text-gray-400">Create your account and start sharing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.username ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
              {errors.username && <p className="text-pink-400 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.email ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
              {errors.email && <p className="text-pink-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.password ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
              {errors.password && <p className="text-pink-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-pink-500 focus:ring-pink-500' : 'border-white/10 focus:ring-purple-500'
                }`}
              />
              {errors.confirmPassword && <p className="text-pink-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-pink-400 text-sm font-semibold bg-pink-500/10 p-3 rounded-lg">{errors.submit}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Creating Account...' : '🚀 Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <p className="text-sm text-purple-200">
              <strong className="text-purple-300">💡 Demo Tip:</strong> Use any username and password. Data is stored locally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '@/lib/storage';

interface User {
  id: string;
  username: string;
  avatar: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Listen for storage changes to update navbar when user logs in from another component
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events from the app
    window.addEventListener('userLoggedIn', handleStorageChange);
    window.addEventListener('userLoggedOut', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleStorageChange);
      window.removeEventListener('userLoggedOut', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event('userLoggedOut'));
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <nav className="glass-effect sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
            <div className="text-3xl transform group-hover:scale-110 transition-transform">✨</div>
            <span className="gradient-text">DevHub</span>
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search amazing content..."
                className="w-full px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/create"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
                >
                  <span>✍️</span> <span className="hidden lg:inline">Create</span>
                </Link>
                <Link href="/create" className="sm:hidden p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
                  ✍️
                </Link>
                <Link
                  href={`/profile/${user.username}`}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                >
                  <span className="text-xl">{user.avatar}</span>
                  <span className="text-sm font-semibold text-white">{user.username}</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  {mobileMenuOpen ? '✕' : '☰'}
                </button>
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/settings" className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    ⚙️
                  </Link>
                  <Link href="/admin" className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    👑
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        {mobileMenuOpen && user && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-2">
            <Link href={`/profile/${user.username}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl">{user.avatar}</span>
              <span className="font-semibold text-white">{user.username}</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all text-gray-300" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </Link>
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all text-gray-300" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl">👑</span>
              <span>Admin</span>
            </Link>
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all text-gray-300 text-left">
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}


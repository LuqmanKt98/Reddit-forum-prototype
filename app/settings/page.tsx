'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUser, logout } from '@/lib/storage';
import { User } from '@/lib/types';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'privacy'>('profile');
  const [formData, setFormData] = useState({
    bio: '',
    avatar: '👨‍💻',
  });
  const [message, setMessage] = useState('');

  const avatarOptions = ['👨‍💻', '🎨', '🚀', '💡', '🎯', '📚', '🎮', '🏆', '⭐', '🔥'];

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setFormData({
      bio: currentUser.bio || '',
      avatar: currentUser.avatar,
    });
  }, [router]);

  const handleSaveProfile = () => {
    if (!user) return;
    updateUser(user.id, {
      bio: formData.bio,
      avatar: formData.avatar,
    });
    setUser({ ...user, bio: formData.bio, avatar: formData.avatar });
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  if (!mounted || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">⚙️ Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl overflow-hidden">
              {['profile', 'account', 'privacy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`w-full px-4 py-3 text-left font-semibold transition border-l-4 ${
                    activeTab === tab
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {tab === 'profile' && '👤 Profile'}
                  {tab === 'account' && '🔐 Account'}
                  {tab === 'privacy' && '🔒 Privacy'}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="glass-effect rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Avatar</label>
                  <div className="grid grid-cols-5 gap-3">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setFormData({ ...formData, avatar })}
                        className={`p-4 rounded-lg text-3xl transition ${
                          formData.avatar === avatar
                            ? 'bg-purple-500/30 border-2 border-purple-500'
                            : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-400 mt-2">{formData.bio.length}/500</p>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveProfile}
                  className="w-full px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/30 transition"
                >
                  💾 Save Changes
                </button>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="glass-effect rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                </div>

                {/* Account Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={user.username}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">Username cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Account Created</label>
                    <input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="glass-effect rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Show Profile</p>
                      <p className="text-sm text-gray-400">Allow others to view your profile</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Show Activity</p>
                      <p className="text-sm text-gray-400">Show your posts and comments publicly</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Receive Messages</p>
                      <p className="text-sm text-gray-400">Allow others to send you messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/" className="text-purple-400 font-semibold hover:text-purple-300 transition">
            ← Back to feed
          </Link>
        </div>
      </div>
    </div>
  );
}


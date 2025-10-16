'use client';

import { useEffect, useState } from 'react';
import {
  getPosts, deletePost, getCurrentUser, getUsers, deleteUser,
  banUser, unbanUser, promoteToModerator, promoteToAdmin, demoteToUser,
  pinPost, unpinPost, lockPost, unlockPost, getCommunities,
  deleteCommunity
} from '@/lib/storage';
import { Post, User, Community } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'users' | 'comments' | 'communities'>('dashboard');

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    // Check if user is admin
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }
    setCurrentUser(user);
    setPosts(getPosts());
    setUsers(getUsers());
    setCommunities(getCommunities());
  }, [router]);

  // Post handlers
  const handleDeletePost = (postId: string) => {
    if (confirm('Delete this post?')) {
      deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
    }
  };

  const handlePinPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post?.isPinned) {
      unpinPost(postId);
    } else {
      pinPost(postId);
    }
    setPosts(getPosts());
  };

  const handleLockPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post?.isLocked) {
      unlockPost(postId);
    } else {
      lockPost(postId);
    }
    setPosts(getPosts());
  };

  // User handlers
  const handleBanUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.isBanned) {
      unbanUser(userId);
    } else {
      banUser(userId);
    }
    setUsers(getUsers());
  };

  const handlePromoteToModerator = (userId: string) => {
    promoteToModerator(userId);
    setUsers(getUsers());
  };

  const handlePromoteToAdmin = (userId: string) => {
    promoteToAdmin(userId);
    setUsers(getUsers());
  };

  const handleDemoteToUser = (userId: string) => {
    demoteToUser(userId);
    setUsers(getUsers());
  };



  // Community handlers
  const handleDeleteCommunity = (communityId: string) => {
    if (confirm('Delete this community?')) {
      deleteCommunity(communityId);
      setCommunities(getCommunities());
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString();
  };

  if (!mounted || !currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">⚙️ Admin Dashboard</h1>
          <p className="text-gray-400">Manage all aspects of the forum</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 overflow-x-auto">
          {['dashboard', 'posts', 'users', 'comments', 'communities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'dashboard' | 'posts' | 'users' | 'comments' | 'communities')}
              className={`px-4 py-2 font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'posts' && ` (${posts.length})`}
              {tab === 'users' && ` (${users.length})`}
              {tab === 'communities' && ` (${communities.length})`}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-effect rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-2">Total Users</div>
                <div className="text-3xl font-bold text-purple-400">{users.length}</div>
              </div>
              <div className="glass-effect rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-2">Total Posts</div>
                <div className="text-3xl font-bold text-blue-400">{posts.length}</div>
              </div>
              <div className="glass-effect rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-2">Communities</div>
                <div className="text-3xl font-bold text-green-400">{communities.length}</div>
              </div>
              <div className="glass-effect rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-2">Banned Users</div>
                <div className="text-3xl font-bold text-red-400">{users.filter(u => u.isBanned).length}</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{post.title}</p>
                      <p className="text-xs text-gray-400">by {post.author} • {formatTime(post.timestamp)}</p>
                    </div>
                    <span className="text-sm text-gray-400">{post.upvotes - post.downvotes} votes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="glass-effect rounded-2xl overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No posts yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Title</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Author</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Community</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Stats</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-4 py-3">
                          <Link href={`/post/${post.id}`} className="text-purple-400 hover:text-purple-300 font-semibold line-clamp-1">
                            {post.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{post.author}</td>
                        <td className="px-4 py-3 text-gray-400">{post.community}</td>
                        <td className="px-4 py-3 text-gray-400">
                          <span className="text-xs">👍 {post.upvotes} 👎 {post.downvotes} 💬 {post.commentsCount}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {post.isPinned && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">📌 Pinned</span>}
                            {post.isLocked && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">🔒 Locked</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePinPost(post.id)}
                              className={`px-2 py-1 rounded text-xs font-semibold transition ${
                                post.isPinned
                                  ? 'bg-yellow-500/30 text-yellow-400'
                                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
                              }`}
                            >
                              {post.isPinned ? 'Unpin' : 'Pin'}
                            </button>
                            <button
                              onClick={() => handleLockPost(post.id)}
                              className={`px-2 py-1 rounded text-xs font-semibold transition ${
                                post.isLocked
                                  ? 'bg-red-500/30 text-red-400'
                                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
                              }`}
                            >
                              {post.isLocked ? 'Unlock' : 'Lock'}
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold hover:bg-red-500/30 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-effect rounded-2xl overflow-hidden">
            {users.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No users</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Username</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Role</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Karma</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-4 py-3 font-semibold text-white">{user.avatar} {user.username}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                            user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{user.karma.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.isBanned
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {user.isBanned ? 'Banned' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handlePromoteToAdmin(user.id)}
                                className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold hover:bg-red-500/30 transition"
                              >
                                Make Admin
                              </button>
                            )}
                            {user.role !== 'moderator' && user.role !== 'admin' && (
                              <button
                                onClick={() => handlePromoteToModerator(user.id)}
                                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold hover:bg-blue-500/30 transition"
                              >
                                Make Mod
                              </button>
                            )}
                            {user.role !== 'user' && (
                              <button
                                onClick={() => handleDemoteToUser(user.id)}
                                className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-semibold hover:bg-gray-500/30 transition"
                              >
                                Demote
                              </button>
                            )}
                            <button
                              onClick={() => handleBanUser(user.id)}
                              className={`px-2 py-1 rounded text-xs font-semibold transition ${
                                user.isBanned
                                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              }`}
                            >
                              {user.isBanned ? 'Unban' : 'Ban'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="glass-effect rounded-2xl p-6">
            <p className="text-gray-400">Comment moderation coming soon...</p>
          </div>
        )}

        {/* Communities Tab */}
        {activeTab === 'communities' && (
          <div className="glass-effect rounded-2xl overflow-hidden">
            {communities.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No communities</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Description</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Members</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Created By</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communities.map((community) => (
                      <tr key={community.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-4 py-3 font-semibold text-white">{community.icon} {community.name}</td>
                        <td className="px-4 py-3 text-gray-400 line-clamp-1">{community.description}</td>
                        <td className="px-4 py-3 text-gray-400">{community.members.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-400">{community.createdBy}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteCommunity(community.id)}
                            className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold hover:bg-red-500/30 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

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


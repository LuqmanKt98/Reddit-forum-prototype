'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUsers, getPosts, getCommentsByPostId, getCurrentUser } from '@/lib/storage';
import { User, Post, Comment } from '@/lib/types';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'about'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    setMounted(true);
    const current = getCurrentUser();
    setCurrentUser(current);

    // Find user by username
    const users = getUsers();
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (!foundUser) {
      router.push('/');
      return;
    }

    setUser(foundUser);
    setEditBio(foundUser.bio || '');

    // Get user's posts
    const allPosts = getPosts();
    const userPostsList = allPosts.filter(p => p.authorId === foundUser.id);
    setUserPosts(userPostsList);

    // Get user's comments
    const allComments: Comment[] = [];
    allPosts.forEach(post => {
      const comments = getCommentsByPostId(post.id);
      allComments.push(...comments.filter(c => c.authorId === foundUser.id));
    });
    setUserComments(allComments);
  }, [username, router]);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    return 'Today';
  };

  if (!mounted || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="text-8xl">{user.avatar}</div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">u/{user.username}</h1>
                <p className="text-gray-400 mb-4">
                  {user.role === 'admin' && '👑 Administrator'}
                  {user.role === 'moderator' && '🛡️ Moderator'}
                  {user.role === 'user' && '👤 Member'}
                </p>
                <p className="text-sm text-gray-400">
                  Joined {formatTime(user.createdAt)}
                </p>
              </div>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => router.push('/settings')}
                className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/30 transition"
              >
                ⚙️ Settings
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-gray-400 text-sm">Karma</div>
              <div className="text-2xl font-bold text-purple-400">{user.karma.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Posts</div>
              <div className="text-2xl font-bold text-blue-400">{userPosts.length}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Comments</div>
              <div className="text-2xl font-bold text-green-400">{userComments.length}</div>
            </div>
          </div>

          {/* Bio */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/30 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditBio(user.bio || '');
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg font-semibold hover:bg-gray-500/30 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-3">{user.bio || 'No bio yet'}</p>
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                >
                  Edit bio
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-white/10">
          {['posts', 'comments', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'posts' | 'comments' | 'about')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-5">
            {userPosts.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <p className="text-gray-400">No posts yet</p>
              </div>
            ) : (
              userPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            {userComments.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <p className="text-gray-400">No comments yet</p>
              </div>
            ) : (
              userComments.map((comment) => (
                <div key={comment.id} className="glass-effect rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                    <span>{user.avatar}</span>
                    <span className="font-semibold text-white">{user.username}</span>
                    <span>•</span>
                    <span>{formatTime(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-400">
                    <span>👍 {comment.upvotes}</span>
                    <span>👎 {comment.downvotes}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Account Information</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Username: <span className="text-white">{user.username}</span></p>
                <p>Email: <span className="text-white">{user.email || 'Not provided'}</span></p>
                <p>Role: <span className="text-white capitalize">{user.role}</span></p>
                <p>Joined: <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span></p>
                <p>Status: <span className={user.isBanned ? 'text-red-400' : 'text-green-400'}>{user.isBanned ? 'Banned' : 'Active'}</span></p>
              </div>
            </div>
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


'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { getPosts, getCommunities } from '@/lib/storage';
import { initializeStorage } from '@/lib/storage';
import { Post, Community } from '@/lib/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState<'new' | 'hot' | 'top'>('new');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initializeStorage();
    setMounted(true);
    setCommunities(getCommunities());
  }, []);

  useEffect(() => {
    const allPosts = getPosts();

    // Filter by community
    let filteredPosts = allPosts;
    if (selectedCommunity !== 'all') {
      filteredPosts = filteredPosts.filter(p => p.community === selectedCommunity);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
      );
    }

    // Sort posts: pinned first, then by selected sort
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      // Pinned posts first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then sort by selected option
      if (sortBy === 'new') {
        return b.timestamp - a.timestamp;
      } else if (sortBy === 'hot') {
        const aScore = a.upvotes - a.downvotes;
        const bScore = b.upvotes - b.downvotes;
        return bScore - aScore;
      } else if (sortBy === 'top') {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      }
      return 0;
    });

    setPosts(sortedPosts);
  }, [sortBy, selectedCommunity, searchQuery]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 gradient-text">✨ Discover Amazing Content</h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Join the conversation with developers worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Community Filter */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Communities</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCommunity('all')}
                  className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                    selectedCommunity === 'all'
                      ? 'bg-purple-500/30 text-purple-400 border border-purple-500'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  All Communities
                </button>
                {communities.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => setSelectedCommunity(community.name)}
                    className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                      selectedCommunity === community.name
                        ? 'bg-purple-500/30 text-purple-400 border border-purple-500'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {community.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <p className="text-sm text-gray-400 w-full">Sort by</p>
              {['new', 'hot', 'top'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option as 'new' | 'hot' | 'top')}
                  className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                    sortBy === option
                      ? 'bg-purple-500/30 text-purple-400 border border-purple-500'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {option === 'new' && '🆕 New'}
                  {option === 'hot' && '🔥 Hot'}
                  {option === 'top' && '⭐ Top'}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {posts.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-gray-300 text-lg">No posts yet. Be the first to create one!</p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
            </div>
          </div>

          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Post } from '@/lib/types';
import { useState } from 'react';
import { updatePostVotes } from '@/lib/storage';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    setUpvotes(upvotes + 1);
    // Note: updatePostVotes requires userId, which should come from context
    // For now, we'll just update local state
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownvotes(downvotes + 1);
    // Note: updatePostVotes requires userId, which should come from context
    // For now, we'll just update local state
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const mockImages = [
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
  ];
  const imageUrl = mockImages[parseInt(post.id) % mockImages.length];

  return (
    <Link href={`/post/${post.id}`}>
      <div className="glass-effect rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-semibold">{post.community}</span>
              <span className="flex items-center gap-1">
                <span>👤</span> {post.author}
              </span>
              <span>•</span>
              <span>{formatTime(post.timestamp)}</span>
            </div>
            {post.isPinned && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">📌 Pinned</span>
            )}
            {post.isLocked && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">🔒 Locked</span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
            {post.title}
          </h3>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.content}</p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <button onClick={handleUpvote} className="text-gray-400 hover:text-purple-400 transition">
                  ⬆️
                </button>
                <span className="text-sm font-bold text-white">{upvotes - downvotes}</span>
                <button onClick={handleDownvote} className="text-gray-400 hover:text-pink-400 transition">
                  ⬇️
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                💬 <span className="text-sm font-semibold">{post.commentsCount}</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                🔗
              </button>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-gray-400 hover:text-yellow-400">
                ⭐
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


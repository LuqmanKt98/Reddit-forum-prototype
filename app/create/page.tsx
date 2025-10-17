'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, addPost } from '@/lib/storage';
import { Post } from '@/lib/types';
import { mockCommunities } from '@/lib/mockData';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
    image: '',
    community: 'r/webdev',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.content.trim() && !formData.link.trim()) {
      setError('Content or link is required');
      return;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      title: formData.title,
      author: user.username,
      authorId: user.id,
      content: formData.content,
      image: formData.image || undefined,
      link: formData.link || undefined,
      timestamp: Date.now(),
      upvotes: 1,
      downvotes: 0,
      commentsCount: 0,
      community: formData.community,
    };

    addPost(newPost);
    router.push('/');
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
        <div className="glass-effect rounded-2xl p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">✍️ Create a Post</h1>
            <p className="text-gray-400 text-sm sm:text-base">Share your thoughts with the community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Community */}
          <div>
            <label htmlFor="community" className="block text-sm font-semibold text-gray-300 mb-2">
              Community
            </label>
            <select
              id="community"
              name="community"
              value={formData.community}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {mockCommunities.map((community) => (
                <option key={community.id} value={community.name}>
                  {community.name} - {community.description}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
              Title <span className="text-pink-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              maxLength={300}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.title.length}/300</p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-semibold text-gray-300 mb-2">
              Link (optional)
            </label>
            <input
              id="link"
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Image Emoji */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-300 mb-2">
              Image Emoji (optional)
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g., 🖼️ 📸 🎨"
              maxLength={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Error */}
          {error && <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-300 text-sm">{error}</div>}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
            >
              ✍️ Post
            </button>
            <Link
              href="/"
              className="w-full sm:flex-1 px-6 py-3 border border-white/10 text-gray-300 rounded-xl font-semibold hover:bg-white/5 transition-all text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}


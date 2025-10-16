'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostById, deletePost, getCurrentUser, updatePost } from '@/lib/storage';
import { Post, User } from '@/lib/types';
import CommentSection from '@/components/CommentSection';
import Link from 'next/link';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    const foundPost = getPostById(postId);
    if (foundPost) {
      setPost(foundPost);
      setUpvotes(foundPost.upvotes);
      setDownvotes(foundPost.downvotes);
      setEditTitle(foundPost.title);
      setEditContent(foundPost.content);
    }
  }, [postId]);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
    // Note: updatePostVotes requires userId, which should come from context
    // For now, we'll just update local state
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
    // Note: updatePostVotes requires userId, which should come from context
    // For now, we'll just update local state
  };

  const handleSaveEdit = () => {
    if (!post) return;
    updatePost(post.id, {
      title: editTitle,
      content: editContent,
      edited: Date.now(),
    });
    setPost({ ...post, title: editTitle, content: editContent, edited: Date.now() });
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
      router.push('/');
    }
  };

  const canEditPost = currentUser && (currentUser.id === post?.authorId || currentUser.role === 'admin');

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

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-4">Post not found</p>
            <Link href="/" className="text-purple-400 font-semibold hover:text-purple-300">
              Back to feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="text-purple-400 font-semibold hover:text-purple-300 mb-6 inline-block transition">
          ← Back to feed
        </Link>

      {/* Post */}
      <div className="glass-effect rounded-2xl p-8 mb-8">
        <div className="flex gap-6">
          {/* Voting */}
          <div className="flex flex-col items-center gap-3 bg-white/5 rounded-xl p-4 h-fit">
            <button
              onClick={handleUpvote}
              className="text-gray-400 hover:text-purple-400 transition text-2xl hover:scale-110"
            >
              ⬆️
            </button>
            <span className="text-lg font-bold text-white w-8 text-center">
              {upvotes - downvotes}
            </span>
            <button
              onClick={handleDownvote}
              className="text-gray-400 hover:text-pink-400 transition text-2xl hover:scale-110"
            >
              ⬇️
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-semibold text-xs">{post.community}</span>
                <span>•</span>
                <span>Posted by {post.author}</span>
                <span>•</span>
                <span>{formatTime(post.timestamp)}</span>
                {post.edited && <span className="text-xs text-gray-500">(edited)</span>}
                {post.isPinned && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">📌 Pinned</span>}
                {post.isLocked && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">🔒 Locked</span>}
              </div>
              {canEditPost && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-semibold hover:bg-blue-500/30 transition"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm font-semibold hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-4xl font-bold bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <h1 className="text-4xl font-bold gradient-text mb-6">{post.title}</h1>
            )}

            {/* Content */}
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4"
                rows={6}
              />
            ) : (
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">{post.content}</p>
            )}

            {isEditing && (
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/30 transition mb-6"
              >
                💾 Save Changes
              </button>
            )}

            {/* Image */}
            {post.image && (
              <div className="mb-6 text-6xl bg-white/5 rounded-xl p-8 w-fit border border-white/10">{post.image}</div>
            )}

            {/* Link */}
            {post.link && (
              <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-semibold break-all transition"
                >
                  🔗 {post.link}
                </a>
              </div>
            )}

            {/* Stats */}
            <div className="flex gap-6 text-gray-400 text-sm border-t border-white/10 pt-6">
              <button className="flex items-center gap-1 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition">
                💬 {post.commentsCount} Comments
              </button>
              <button className="flex items-center gap-1 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition">
                🔗 Share
              </button>
              <button className="flex items-center gap-1 hover:text-purple-400 hover:bg-white/5 px-3 py-2 rounded-lg transition">
                ⚡ Award
              </button>
              <button className="flex items-center gap-1 hover:text-red-400 hover:bg-white/5 px-3 py-2 rounded-lg transition">
                🚩 Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection postId={postId} />
      </div>
    </div>
  );
}


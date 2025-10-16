'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/lib/types';
import { getCommentsByPostId, addComment, deleteComment, getCurrentUser, updateComment } from '@/lib/storage';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
    const postComments = getCommentsByPostId(postId);
    setComments(postComments);
  }, [postId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: user.username,
      authorId: user.id,
      content: newComment,
      timestamp: Date.now(),
      upvotes: 0,
      downvotes: 0,
    };

    addComment(postId, comment);
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Delete this comment?')) {
      deleteComment(postId, commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editingContent.trim()) return;
    updateComment(postId, commentId, {
      content: editingContent,
      edited: Date.now(),
    });
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, content: editingContent, edited: Date.now() }
          : c
      )
    );
    setEditingCommentId(null);
    setEditingContent('');
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

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleAddComment} className="glass-effect rounded-2xl p-5">
          <div className="flex gap-3 mb-4">
            <span className="text-2xl">{user.avatar}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-white">{user.username}</p>
              <p className="text-xs text-gray-400">Commenting as {user.username}</p>
            </div>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setNewComment('')}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 hover:bg-white/5 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
            >
              Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-effect rounded-2xl p-5 text-center">
          <p className="text-gray-400 mb-2">Log in to comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">💬 Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass-effect rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-sm text-white">{comment.author}</p>
                  <p className="text-xs text-gray-400">
                    {formatTime(comment.timestamp)}
                    {comment.edited && <span className="ml-2 text-gray-500">(edited)</span>}
                  </p>
                </div>
                {user?.id === comment.authorId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-semibold hover:bg-purple-500/30 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded text-sm font-semibold hover:bg-gray-500/30 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 mb-4">{comment.content}</p>
              )}
              <div className="flex gap-4 text-gray-400 text-sm">
                <button className="flex items-center gap-1 hover:text-purple-400 transition">
                  ⬆️ {comment.upvotes}
                </button>
                <button className="flex items-center gap-1 hover:text-pink-400 transition">
                  ⬇️ {comment.downvotes}
                </button>
                <button className="hover:text-gray-300 transition">Reply</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


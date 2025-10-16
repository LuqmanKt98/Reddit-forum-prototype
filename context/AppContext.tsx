'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Post, Comment, Community } from '@/lib/types';
import { initializeStorage, getCurrentUser, setCurrentUser, logout } from '@/lib/storage';
import { usePosts, useComments, useUsers, useLocalStorage } from '@/lib/hooks';

interface AppContextType {
  // User
  currentUser: User | null;
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;

  // Posts
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  getPostById: (postId: string) => Post | undefined;
  getPostsByAuthor: (authorId: string) => Post[];
  getPostsByCommunity: (community: string) => Post[];

  // Comments
  comments: Record<string, Comment[]>;
  addComment: (postId: string, comment: Comment) => void;
  updateComment: (postId: string, commentId: string, updates: Partial<Comment>) => void;
  deleteComment: (postId: string, commentId: string) => void;
  getCommentsByPostId: (postId: string) => Comment[];
  getCommentsByAuthor: (authorId: string) => Comment[];

  // Communities
  communities: Community[];
  selectedCommunity: string | null;
  setSelectedCommunity: (community: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  const { users, addUser, updateUser, getUserById, getUserByUsername } = useUsers();
  const { posts, addPost, updatePost, deletePost, getPostById, getPostsByAuthor, getPostsByCommunity } = usePosts();
  const { comments, addComment, updateComment, deleteComment, getCommentsByPostId, getCommentsByAuthor } = useComments();
  const [communities] = useLocalStorage<Community[]>('reddit_communities', []);

  // Initialize on mount
  useEffect(() => {
    try {
      initializeStorage();
      const user = getCurrentUser();
      setCurrentUserState(user);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setIsLoading(false);
    }
  }, []);

  // Listen for login/logout events
  useEffect(() => {
    const handleLogin = () => {
      const user = getCurrentUser();
      setCurrentUserState(user);
    };

    const handleLogout = () => {
      setCurrentUserState(null);
    };

    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentUserState(user);
  };

  const handleLogout = () => {
    logout();
    setCurrentUserState(null);
  };

  const value: AppContextType = {
    // User
    currentUser,
    users,
    login: handleLogin,
    logout: handleLogout,
    isLoading,

    // Posts
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getPostsByAuthor,
    getPostsByCommunity,

    // Comments
    comments,
    addComment,
    updateComment,
    deleteComment,
    getCommentsByPostId,
    getCommentsByAuthor,

    // Communities
    communities,
    selectedCommunity,
    setSelectedCommunity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}


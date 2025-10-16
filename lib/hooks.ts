'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Post, Comment } from './types';

// Generic localStorage hook
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
        setIsLoaded(true);
      }
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      setIsLoaded(true);
    }
  }, [key]);

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch custom event for cross-tab communication
          window.dispatchEvent(new CustomEvent('storageUpdate', { detail: { key, value: valueToStore } }));
        }
      } catch (error) {
        console.error(`Error writing to localStorage (${key}):`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoaded] as const;
};

// Hook for current user
export const useCurrentUser = () => {
  const [user, setUser, isLoaded] = useLocalStorage<User | null>('reddit_current_user', null);

  const login = useCallback(
    (newUser: User) => {
      setUser(newUser);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userLoggedIn'));
      }
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('userLoggedOut'));
    }
  }, [setUser]);

  return { user, login, logout, isLoaded };
};

// Hook for posts
export const usePosts = () => {
  const [posts, setPosts, isLoaded] = useLocalStorage<Post[]>('reddit_posts', []);

  const addPost = useCallback(
    (post: Post) => {
      setPosts((prev) => [post, ...prev]);
    },
    [setPosts]
  );

  const updatePost = useCallback(
    (postId: string, updates: Partial<Post>) => {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updates } : p)));
    },
    [setPosts]
  );

  const deletePost = useCallback(
    (postId: string) => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    },
    [setPosts]
  );

  const getPostById = useCallback(
    (postId: string) => {
      return posts.find((p) => p.id === postId);
    },
    [posts]
  );

  const getPostsByAuthor = useCallback(
    (authorId: string) => {
      return posts.filter((p) => p.authorId === authorId);
    },
    [posts]
  );

  const getPostsByCommunity = useCallback(
    (community: string) => {
      return posts.filter((p) => p.community === community);
    },
    [posts]
  );

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getPostsByAuthor,
    getPostsByCommunity,
    isLoaded,
  };
};

// Hook for comments
export const useComments = () => {
  const [comments, setComments, isLoaded] = useLocalStorage<Record<string, Comment[]>>('reddit_comments', {});

  const addComment = useCallback(
    (postId: string, comment: Comment) => {
      setComments((prev) => ({
        ...prev,
        [postId]: [comment, ...(prev[postId] || [])],
      }));
    },
    [setComments]
  );

  const updateComment = useCallback(
    (postId: string, commentId: string, updates: Partial<Comment>) => {
      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).map((c) => (c.id === commentId ? { ...c, ...updates } : c)),
      }));
    },
    [setComments]
  );

  const deleteComment = useCallback(
    (postId: string, commentId: string) => {
      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter((c) => c.id !== commentId),
      }));
    },
    [setComments]
  );

  const getCommentsByPostId = useCallback(
    (postId: string) => {
      return comments[postId] || [];
    },
    [comments]
  );

  const getCommentsByAuthor = useCallback(
    (authorId: string) => {
      const allComments: Comment[] = [];
      Object.values(comments).forEach((postComments) => {
        allComments.push(...postComments.filter((c) => c.authorId === authorId));
      });
      return allComments;
    },
    [comments]
  );

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
    getCommentsByPostId,
    getCommentsByAuthor,
    isLoaded,
  };
};

// Hook for users
export const useUsers = () => {
  const [users, setUsers, isLoaded] = useLocalStorage<User[]>('reddit_users', []);

  const addUser = useCallback(
    (user: User) => {
      setUsers((prev) => [...prev, user]);
    },
    [setUsers]
  );

  const updateUser = useCallback(
    (userId: string, updates: Partial<User>) => {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
    },
    [setUsers]
  );

  const getUserById = useCallback(
    (userId: string) => {
      return users.find((u) => u.id === userId);
    },
    [users]
  );

  const getUserByUsername = useCallback(
    (username: string) => {
      return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    },
    [users]
  );

  return {
    users,
    addUser,
    updateUser,
    getUserById,
    getUserByUsername,
    isLoaded,
  };
};


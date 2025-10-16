import { User } from './types';

// Simple hash function for demo purposes (NOT for production)
export const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

// Verify password
export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create new user
export const createUser = (
  username: string,
  password: string,
  email?: string,
  role: 'user' | 'admin' = 'user'
): User => {
  return {
    id: generateId(),
    username,
    email,
    avatar: '👤',
    karma: 0,
    role,
    createdAt: Date.now(),
    passwordHash: hashPassword(password),
    isBanned: false,
  };
};

// Validate username
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (!username || username.trim().length === 0) {
    return { valid: false, error: 'Username is required' };
  }
  if (username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  if (username.length > 20) {
    return { valid: false, error: 'Username must be at most 20 characters' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  return { valid: true };
};

// Validate password
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password || password.length === 0) {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  if (password.length > 50) {
    return { valid: false, error: 'Password must be at most 50 characters' };
  }
  return { valid: true };
};

// Validate email
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email) return { valid: true }; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
};

// Check if user exists
export const userExists = (username: string, users: User[]): boolean => {
  return users.some((u) => u.username.toLowerCase() === username.toLowerCase());
};

// Get user by username
export const getUserByUsername = (username: string, users: User[]): User | undefined => {
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
};

// Get user by ID
export const getUserById = (id: string, users: User[]): User | undefined => {
  return users.find((u) => u.id === id);
};

// Update user karma
export const updateUserKarma = (userId: string, amount: number, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, karma: u.karma + amount } : u));
};

// Ban user
export const banUser = (userId: string, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, isBanned: true } : u));
};

// Unban user
export const unbanUser = (userId: string, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, isBanned: false } : u));
};

// Promote user to moderator
export const promoteToModerator = (userId: string, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, role: 'moderator' } : u));
};

// Promote user to admin
export const promoteToAdmin = (userId: string, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, role: 'admin' } : u));
};

// Demote user to regular user
export const demoteToUser = (userId: string, users: User[]): User[] => {
  return users.map((u) => (u.id === userId ? { ...u, role: 'user' } : u));
};

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin' || false;
};

// Check if user is moderator
export const isModerator = (user: User | null): boolean => {
  return user?.role === 'moderator' || user?.role === 'admin' || false;
};

// Check if user can edit post
export const canEditPost = (currentUser: User | null, authorId: string): boolean => {
  if (!currentUser) return false;
  return currentUser.id === authorId || isAdmin(currentUser);
};

// Check if user can delete post
export const canDeletePost = (currentUser: User | null, authorId: string): boolean => {
  if (!currentUser) return false;
  return currentUser.id === authorId || isAdmin(currentUser);
};


export interface User {
  id: string;
  username: string;
  email?: string;
  avatar: string;
  karma: number;
  role: 'user' | 'admin' | 'moderator';
  createdAt: number;
  bio?: string;
  passwordHash?: string;
  isBanned?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
  edited?: number;
  postId: string;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  authorId: string;
  content: string;
  image?: string;
  link?: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  community: string;
  edited?: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  createdAt: number;
  createdBy: string;
  rules?: string[];
}

export interface Vote {
  userId: string;
  postId?: string;
  commentId?: string;
  type: 'upvote' | 'downvote';
  timestamp: number;
}


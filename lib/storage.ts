import { Post, Comment, User, Community, Vote } from './types';
import { mockPosts, mockComments, mockUsers, mockCommunities } from './mockData';

const STORAGE_KEYS = {
  POSTS: 'reddit_posts',
  COMMENTS: 'reddit_comments',
  USERS: 'reddit_users',
  CURRENT_USER: 'reddit_current_user',
  COMMUNITIES: 'reddit_communities',
  VOTES: 'reddit_votes',
  VERSION: 'reddit_storage_version',
};

const STORAGE_VERSION = '1.0.0';

// Initialize localStorage with mock data if empty
export const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  // Check version and migrate if needed
  const version = localStorage.getItem(STORAGE_KEYS.VERSION);
  if (!version) {
    localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
  }

  // Initialize posts
  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(mockPosts));
  }

  // Initialize comments
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    const commentsMap: Record<string, Comment[]> = {};
    mockPosts.forEach((post) => {
      commentsMap[post.id] = mockComments;
    });
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsMap));
  }

  // Initialize users
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }

  // Initialize communities
  if (!localStorage.getItem(STORAGE_KEYS.COMMUNITIES)) {
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(mockCommunities));
  }

  // Initialize votes
  if (!localStorage.getItem(STORAGE_KEYS.VOTES)) {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify([]));
  }
};

// Posts
export const getPosts = (): Post[] => {
  if (typeof window === 'undefined') return mockPosts;
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts) : mockPosts;
};

export const getPostById = (id: string): Post | undefined => {
  const posts = getPosts();
  return posts.find((p) => p.id === id);
};

export const addPost = (post: Post) => {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
};

export const deletePost = (id: string) => {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filtered));
};

export const updatePost = (id: string, updates: Partial<Post>) => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === id);
  if (post) {
    Object.assign(post, updates);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }
};

// Comments
export const getCommentsByPostId = (postId: string): Comment[] => {
  if (typeof window === 'undefined') return [];
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const commentsMap = comments ? JSON.parse(comments) : {};
  return commentsMap[postId] || [];
};

export const addComment = (postId: string, comment: Comment) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const commentsMap = comments ? JSON.parse(comments) : {};
  if (!commentsMap[postId]) {
    commentsMap[postId] = [];
  }
  commentsMap[postId].unshift(comment);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsMap));

  // Update post comment count
  const post = getPostById(postId);
  if (post) {
    updatePost(postId, { commentsCount: post.commentsCount + 1 });
  }
};

export const deleteComment = (postId: string, commentId: string) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const commentsMap = comments ? JSON.parse(comments) : {};
  if (commentsMap[postId]) {
    commentsMap[postId] = commentsMap[postId].filter((c: Comment) => c.id !== commentId);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsMap));

    // Update post comment count
    const post = getPostById(postId);
    if (post && post.commentsCount > 0) {
      updatePost(postId, { commentsCount: post.commentsCount - 1 });
    }
  }
};

export const updateComment = (postId: string, commentId: string, updates: Partial<Comment>) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const commentsMap = comments ? JSON.parse(comments) : {};
  if (commentsMap[postId]) {
    commentsMap[postId] = commentsMap[postId].map((c: Comment) =>
      c.id === commentId ? { ...c, ...updates } : c
    );
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsMap));
  }
};

// User Management
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return mockUsers;
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : mockUsers;
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find((u) => u.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  const users = getUsers();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
};

export const addUser = (user: User) => {
  const users = getUsers();
  if (users.some((u) => u.username.toLowerCase() === user.username.toLowerCase())) {
    throw new Error('Username already exists');
  }
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const updateUser = (id: string, updates: Partial<User>) => {
  const users = getUsers();
  const user = users.find((u) => u.id === id);
  if (user) {
    Object.assign(user, updates);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

// Current User Session
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  // Dispatch event to notify components of login
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('userLoggedIn'));
  }
  return user;
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  // Dispatch event to notify components of logout
  window.dispatchEvent(new Event('userLoggedOut'));
};

// Communities
export const getCommunities = (): Community[] => {
  if (typeof window === 'undefined') return mockCommunities;
  const communities = localStorage.getItem(STORAGE_KEYS.COMMUNITIES);
  return communities ? JSON.parse(communities) : mockCommunities;
};

export const getCommunityById = (id: string): Community | undefined => {
  const communities = getCommunities();
  return communities.find((c) => c.id === id);
};

export const getCommunityByName = (name: string): Community | undefined => {
  const communities = getCommunities();
  return communities.find((c) => c.name.toLowerCase() === name.toLowerCase());
};

export const addCommunity = (community: Community) => {
  const communities = getCommunities();
  communities.push(community);
  localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
};

export const updateCommunity = (id: string, updates: Partial<Community>) => {
  const communities = getCommunities();
  const community = communities.find((c) => c.id === id);
  if (community) {
    Object.assign(community, updates);
    localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
  }
};

// Votes
export const getVotes = (): Vote[] => {
  if (typeof window === 'undefined') return [];
  const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
  return votes ? JSON.parse(votes) : [];
};

export const addVote = (vote: Vote) => {
  const votes = getVotes();
  votes.push(vote);
  localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
};

export const removeVote = (userId: string, postId?: string, commentId?: string) => {
  const votes = getVotes();
  const filtered = votes.filter(
    (v) => !(v.userId === userId && v.postId === postId && v.commentId === commentId)
  );
  localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(filtered));
};

export const getUserVote = (userId: string, postId?: string, commentId?: string): Vote | undefined => {
  const votes = getVotes();
  return votes.find((v) => v.userId === userId && v.postId === postId && v.commentId === commentId);
};

// Admin Functions
export const banUser = (userId: string) => {
  updateUser(userId, { isBanned: true });
};

export const unbanUser = (userId: string) => {
  updateUser(userId, { isBanned: false });
};

export const promoteToModerator = (userId: string) => {
  updateUser(userId, { role: 'moderator' });
};

export const promoteToAdmin = (userId: string) => {
  updateUser(userId, { role: 'admin' });
};

export const demoteToUser = (userId: string) => {
  updateUser(userId, { role: 'user' });
};

export const deleteUser = (userId: string) => {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
};

export const pinPost = (postId: string) => {
  updatePost(postId, { isPinned: true });
};

export const unpinPost = (postId: string) => {
  updatePost(postId, { isPinned: false });
};

export const lockPost = (postId: string) => {
  updatePost(postId, { isLocked: true });
};

export const unlockPost = (postId: string) => {
  updatePost(postId, { isLocked: false });
};

export const deleteCommunity = (communityId: string) => {
  const communities = getCommunities();
  const filtered = communities.filter((c) => c.id !== communityId);
  localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(filtered));
};

export const updatePostVotes = (postId: string, userId: string, type: 'upvote' | 'downvote') => {
  const post = getPostById(postId);
  if (!post) return;

  const existingVote = getUserVote(userId, postId);

  if (existingVote) {
    // Remove existing vote
    if (existingVote.type === type) {
      // Same vote type, remove it
      removeVote(userId, postId);
      if (type === 'upvote') {
        updatePost(postId, { upvotes: Math.max(0, post.upvotes - 1) });
      } else {
        updatePost(postId, { downvotes: Math.max(0, post.downvotes - 1) });
      }
    } else {
      // Different vote type, change it
      removeVote(userId, postId);
      if (existingVote.type === 'upvote') {
        updatePost(postId, { upvotes: Math.max(0, post.upvotes - 1) });
      } else {
        updatePost(postId, { downvotes: Math.max(0, post.downvotes - 1) });
      }
      addVote({ userId, postId, type, timestamp: Date.now() });
      if (type === 'upvote') {
        updatePost(postId, { upvotes: post.upvotes + 1 });
      } else {
        updatePost(postId, { downvotes: post.downvotes + 1 });
      }
    }
  } else {
    // Add new vote
    addVote({ userId, postId, type, timestamp: Date.now() });
    if (type === 'upvote') {
      updatePost(postId, { upvotes: post.upvotes + 1 });
    } else {
      updatePost(postId, { downvotes: post.downvotes + 1 });
    }
  }
};


# Backend Integration Guide

## Overview

This guide explains how to transition from localStorage-based storage to a real backend (Firebase, REST API, GraphQL, etc.).

## Current Architecture

### Storage Layer (`lib/storage.ts`)
All data operations go through this layer:
```typescript
// Posts
getPosts() → returns Post[]
getPostById(id) → returns Post | undefined
addPost(post) → void
updatePost(id, updates) → void
deletePost(id) → void

// Comments
getCommentsByPostId(postId) → returns Comment[]
addComment(postId, comment) → void
updateComment(postId, commentId, updates) → void
deleteComment(postId, commentId) → void

// Users
getUsers() → returns User[]
getUserById(id) → returns User | undefined
addUser(user) → void
updateUser(id, updates) → void

// Communities
getCommunities() → returns Community[]
addCommunity(community) → void
updateCommunity(id, updates) → void

// Votes
getVotes() → returns Vote[]
addVote(vote) → void
removeVote(userId, postId?, commentId?) → void
```

## Integration Steps

### Step 1: Create API Layer

Create `lib/api.ts` to wrap backend calls:

```typescript
// lib/api.ts
export const api = {
  posts: {
    getAll: async () => fetch('/api/posts').then(r => r.json()),
    getById: async (id: string) => fetch(`/api/posts/${id}`).then(r => r.json()),
    create: async (post: Post) => fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post)
    }).then(r => r.json()),
    update: async (id: string, updates: Partial<Post>) => 
      fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      }).then(r => r.json()),
    delete: async (id: string) => 
      fetch(`/api/posts/${id}`, { method: 'DELETE' }),
  },
  // Similar for comments, users, communities, votes
};
```

### Step 2: Update Storage Functions

Modify `lib/storage.ts` to use API:

```typescript
// Before (localStorage)
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts) : mockPosts;
};

// After (API)
export const getPosts = async (): Promise<Post[]> => {
  try {
    return await api.posts.getAll();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};
```

### Step 3: Update Hooks

Modify `lib/hooks.ts` to handle async operations:

```typescript
// Before (sync)
export const usePosts = () => {
  const [posts, setPosts] = useLocalStorage<Post[]>('reddit_posts', []);
  // ...
};

// After (async)
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await api.posts.getAll();
        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);
  
  return { posts, setPosts, isLoading };
};
```

### Step 4: Update Components

Components remain mostly the same, but handle loading states:

```typescript
// Before
const { posts } = usePosts();

// After
const { posts, isLoading } = usePosts();

if (isLoading) return <LoadingSpinner />;
return <PostList posts={posts} />;
```

## Backend Requirements

### Authentication Endpoints
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Posts Endpoints
```
GET /api/posts
GET /api/posts/:id
POST /api/posts
PATCH /api/posts/:id
DELETE /api/posts/:id
GET /api/posts?community=r/webdev
GET /api/posts?author=userId
```

### Comments Endpoints
```
GET /api/posts/:postId/comments
POST /api/posts/:postId/comments
PATCH /api/comments/:id
DELETE /api/comments/:id
```

### Users Endpoints
```
GET /api/users
GET /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id
```

### Communities Endpoints
```
GET /api/communities
GET /api/communities/:id
POST /api/communities
PATCH /api/communities/:id
```

### Votes Endpoints
```
POST /api/votes
DELETE /api/votes/:id
GET /api/votes?userId=:userId
```

## Firebase Integration Example

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

## REST API Integration Example

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  posts: {
    getAll: () => fetch(`${API_BASE}/posts`).then(r => r.json()),
    create: (post: Post) => fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    }).then(r => r.json()),
  }
};
```

## GraphQL Integration Example

```typescript
// lib/graphql.ts
import { gql, ApolloClient } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author
      timestamp
    }
  }
`;

export const getPosts = async (client: ApolloClient) => {
  const { data } = await client.query({ query: GET_POSTS });
  return data.posts;
};
```

## Migration Checklist

- [ ] Create API layer (`lib/api.ts`)
- [ ] Update storage functions to use API
- [ ] Update hooks to handle async operations
- [ ] Add loading states to components
- [ ] Add error handling
- [ ] Update authentication flow
- [ ] Test all CRUD operations
- [ ] Handle offline scenarios
- [ ] Add caching strategy
- [ ] Optimize API calls
- [ ] Add request/response logging
- [ ] Handle rate limiting
- [ ] Add retry logic
- [ ] Update environment variables
- [ ] Deploy backend
- [ ] Deploy frontend

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

## Error Handling

```typescript
try {
  const posts = await api.posts.getAll();
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network error
  } else if (error instanceof AuthError) {
    // Handle auth error
  } else {
    // Handle other errors
  }
}
```

## Caching Strategy

```typescript
const cache = new Map();

export const getPosts = async () => {
  if (cache.has('posts')) {
    return cache.get('posts');
  }
  const posts = await api.posts.getAll();
  cache.set('posts', posts);
  return posts;
};
```

## Performance Optimization

- Implement pagination
- Add request debouncing
- Use request caching
- Implement lazy loading
- Add request batching
- Use CDN for static assets
- Implement service workers

## Testing

```typescript
// Mock API for testing
jest.mock('@/lib/api', () => ({
  api: {
    posts: {
      getAll: jest.fn(() => Promise.resolve(mockPosts))
    }
  }
}));
```

## Rollback Plan

Keep localStorage functions as fallback:

```typescript
export const getPosts = async () => {
  try {
    return await api.posts.getAll();
  } catch (error) {
    console.warn('API failed, using localStorage');
    return getPostsFromLocalStorage();
  }
};
```


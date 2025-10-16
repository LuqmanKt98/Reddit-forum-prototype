# Backend Integration Guide

This document explains how to integrate a real backend with the Reddit-style forum prototype.

## Current Architecture

The app currently uses:
- **Frontend**: Next.js with React
- **Storage**: Browser localStorage
- **Data**: Mock JSON arrays
- **Auth**: Fake login (username only)

## Migration Path

### Phase 1: API Layer (Recommended First Step)

Create API routes in `app/api/` to abstract data access:

```typescript
// app/api/posts/route.ts
export async function GET() {
  // Currently returns mock data
  // Later: fetch from database
  const posts = getPosts();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const post = await request.json();
  addPost(post);
  return Response.json(post);
}
```

### Phase 2: Backend Options

#### Option A: Node.js + Express + MongoDB
```bash
npm install express mongoose cors dotenv
```

**Backend structure:**
```
backend/
├── models/
│   ├── Post.js
│   ├── Comment.js
│   └── User.js
├── routes/
│   ├── posts.js
│   ├── comments.js
│   └── auth.js
├── middleware/
│   └── auth.js
└── server.js
```

#### Option B: Firebase (Recommended for Quick Setup)
```bash
npm install firebase
```

**Benefits:**
- No backend server needed
- Built-in authentication
- Real-time database
- Hosting included

#### Option C: Supabase (PostgreSQL + Auth)
```bash
npm install @supabase/supabase-js
```

**Benefits:**
- PostgreSQL database
- Built-in auth
- Real-time subscriptions
- REST API

### Phase 3: Update Storage Layer

Replace `lib/storage.ts` with API calls:

```typescript
// lib/storage.ts (updated)
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  return response.json();
};

export const addPost = async (post: Post): Promise<Post> => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const deletePost = async (id: string): Promise<void> => {
  await fetch(`/api/posts/${id}`, { method: 'DELETE' });
};
```

### Phase 4: Authentication

Replace mock auth with real authentication:

```typescript
// lib/auth.ts (new)
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const loginUser = async (email: string, password: string) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential.user;
};

export const registerUser = async (email: string, password: string) => {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  return userCredential.user;
};
```

## Implementation Examples

### Firebase Integration

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Supabase Integration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Usage
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
```

## Database Schema

### Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(300) NOT NULL,
  content TEXT,
  author_id UUID NOT NULL REFERENCES users(id),
  community VARCHAR(50),
  image_url VARCHAR(500),
  link VARCHAR(500),
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar VARCHAR(500),
  karma INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables

Create `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Migration Checklist

- [ ] Set up backend infrastructure
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Create API endpoints for posts
- [ ] Create API endpoints for comments
- [ ] Create API endpoints for users
- [ ] Update `lib/storage.ts` to use API
- [ ] Update `lib/auth.ts` for real auth
- [ ] Test all CRUD operations
- [ ] Add error handling
- [ ] Add loading states
- [ ] Deploy backend
- [ ] Update frontend API URLs
- [ ] Test in production

## Performance Considerations

1. **Pagination**: Implement for large post lists
2. **Caching**: Use React Query or SWR
3. **Lazy Loading**: Load comments on demand
4. **Image Optimization**: Use Next.js Image component
5. **Database Indexing**: Index frequently queried fields

## Security Considerations

1. **Authentication**: Use JWT tokens
2. **Authorization**: Verify user permissions
3. **Input Validation**: Sanitize all inputs
4. **Rate Limiting**: Prevent abuse
5. **CORS**: Configure properly
6. **HTTPS**: Always use in production
7. **Secrets**: Never commit API keys

## Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Heroku/Railway/Render)
```bash
git push heroku main
```

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)


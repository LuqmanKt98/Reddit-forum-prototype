# 👨‍💻 Developer Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3001
```

---

## Project Structure

```
reddit-forum/
├── app/
│   ├── page.tsx              # Home feed
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── create/page.tsx       # Create post
│   ├── post/[id]/page.tsx    # Post detail
│   ├── admin/page.tsx        # Admin dashboard
│   ├── profile/[username]/   # User profile
│   ├── settings/page.tsx     # User settings
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── PostCard.tsx          # Post card
│   ├── CommentSection.tsx    # Comments
│   └── Sidebar.tsx           # Sidebar
├── lib/
│   ├── storage.ts            # localStorage ops
│   ├── types.ts              # TypeScript types
│   ├── auth.ts               # Auth utilities
│   └── hooks.ts              # Custom hooks
├── context/
│   └── AppContext.tsx        # Global state
└── public/                   # Static files
```

---

## Key Concepts

### Storage System
All data is stored in localStorage with these keys:
- `reddit_posts` - All posts
- `reddit_comments` - Comments by post ID
- `reddit_users` - All users
- `reddit_current_user` - Current session
- `reddit_communities` - All communities
- `reddit_votes` - Vote tracking

### Data Models

**User**
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar: string;
  bio: string;
  karma: number;
  role: 'user' | 'moderator' | 'admin';
  isBanned: boolean;
  createdAt: number;
}
```

**Post**
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  community: string;
  timestamp: number;
  edited?: number;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  image?: string;
  link?: string;
  isPinned?: boolean;
  isLocked?: boolean;
}
```

**Comment**
```typescript
interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: number;
  edited?: number;
  upvotes: number;
  downvotes: number;
}
```

---

## Common Tasks

### Add a New Page

1. Create file in `app/` directory
2. Use 'use client' directive
3. Import necessary components
4. Add to Navbar if needed

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function NewPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* Your content */}
    </div>
  );
}
```

### Add a New Component

1. Create file in `components/` directory
2. Use 'use client' if needed
3. Export as default

```typescript
'use client';

interface ComponentProps {
  // Props
}

export default function Component({ }: ComponentProps) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

### Add Storage Function

1. Open `lib/storage.ts`
2. Add function following existing pattern
3. Use STORAGE_KEYS for consistency

```typescript
export const myFunction = (param: string) => {
  const data = localStorage.getItem(STORAGE_KEYS.POSTS);
  const parsed = data ? JSON.parse(data) : [];
  // Do something
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(parsed));
};
```

---

## Styling

### Tailwind CSS Classes

**Glass Effect**
```jsx
<div className="glass-effect rounded-2xl p-6">
  {/* Content */}
</div>
```

**Gradient Text**
```jsx
<h1 className="gradient-text">Title</h1>
```

**Button Styles**
```jsx
// Primary
<button className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
  Button
</button>

// Secondary
<button className="bg-white/5 text-gray-400 hover:bg-white/10">
  Button
</button>
```

---

## Testing

### Test Accounts

```
Admin: Admin / admin123
User: TechGuru / password123
```

### Manual Testing Steps

1. Login with test account
2. Create a post
3. Add a comment
4. Edit post/comment
5. Delete post/comment
6. Test search/filter
7. Test sorting
8. Check admin features

---

## Debugging

### Check Console
```bash
# Open browser DevTools (F12)
# Check Console tab for errors
```

### Check localStorage
```javascript
// In browser console
localStorage.getItem('reddit_posts')
localStorage.getItem('reddit_current_user')
```

### Clear Data
```javascript
// In browser console
localStorage.clear()
// Then refresh page
```

---

## Performance Tips

1. Use `useState` for component state
2. Use `useEffect` for side effects
3. Minimize re-renders
4. Use `mounted` check for hydration
5. Lazy load components if needed

---

## Common Issues

### "Export not found"
- Check import path
- Verify function is exported
- Check spelling

### "Cannot read property of undefined"
- Add null checks
- Use optional chaining (?.)
- Check mounted state

### "localStorage is not defined"
- Add `typeof window !== 'undefined'` check
- Use mounted state
- Check SSR compatibility

---

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)

---

## Getting Help

1. Check existing code for examples
2. Review COMPREHENSIVE_AUDIT_AND_PLAN.md
3. Check phase completion summaries
4. Review TESTING_CHECKLIST.md

---

## Next Developer Tasks

1. Implement Phase 5 (Comments Enhancement)
2. Implement Phase 6 (Voting System)
3. Implement Phase 7 (Additional Features)
4. Complete Phase 8 (Testing & Polish)

Good luck! 🚀


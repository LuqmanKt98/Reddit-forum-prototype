# Application Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 15 Application                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Pages (App Router)                       │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • page.tsx (Home Feed)                               │   │
│  │ • login/page.tsx (Authentication)                    │   │
│  │ • signup/page.tsx (Registration)                     │   │
│  │ • create/page.tsx (Post Creation)                    │   │
│  │ • post/[id]/page.tsx (Post Detail)                   │   │
│  │ • admin/page.tsx (Admin Dashboard)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Components (React 19)                       │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • Navbar.tsx (Navigation)                            │   │
│  │ • PostCard.tsx (Post Display)                        │   │
│  │ • CommentSection.tsx (Comments)                      │   │
│  │ • Sidebar.tsx (Communities)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Global State Management (Context)             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • AppContext.tsx (Centralized State)                 │   │
│  │ • AppProvider (State Provider)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Custom Hooks (lib/hooks.ts)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • useLocalStorage (Generic Hook)                     │   │
│  │ • useCurrentUser (User Session)                      │   │
│  │ • usePosts (Post CRUD)                               │   │
│  │ • useComments (Comment CRUD)                         │   │
│  │ • useUsers (User Management)                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Storage Layer (lib/storage.ts)                │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • Posts CRUD                                         │   │
│  │ • Comments CRUD                                      │   │
│  │ • Users Management                                   │   │
│  │ • Communities Management                             │   │
│  │ • Votes Tracking                                     │   │
│  │ • Session Management                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      Utilities (lib/auth.ts, lib/types.ts)           │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • Authentication Functions                           │   │
│  │ • Password Hashing                                   │   │
│  │ • Validation Functions                               │   │
│  │ • Type Definitions                                   │   │
│  │ • Mock Data                                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         localStorage (Browser Storage)               │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • reddit_posts                                       │   │
│  │ • reddit_comments                                    │   │
│  │ • reddit_users                                       │   │
│  │ • reddit_current_user                                │   │
│  │ • reddit_communities                                 │   │
│  │ • reddit_votes                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Action (Click, Submit)
        ↓
Component Event Handler
        ↓
Custom Hook (usePosts, useComments, etc.)
        ↓
Storage Function (lib/storage.ts)
        ↓
localStorage Operation
        ↓
Event Dispatch (for cross-component updates)
        ↓
Component Re-render
        ↓
UI Update
```

## State Management Flow

```
AppProvider (Root)
        ↓
AppContext (Global State)
        ↓
useApp Hook (Access State)
        ↓
Components (Consume State)
        ↓
Event Listeners (Listen for Changes)
        ↓
State Update
        ↓
Re-render
```

## Authentication Flow

```
User Input (Username, Password)
        ↓
Form Validation (lib/auth.ts)
        ↓
User Lookup (lib/storage.ts)
        ↓
Password Verification (lib/auth.ts)
        ↓
Session Creation (setCurrentUser)
        ↓
Event Dispatch (userLoggedIn)
        ↓
Navbar Update
        ↓
Redirect to Home
```

## CRUD Operations Flow

### Create
```
Form Submission
        ↓
Validation
        ↓
Generate ID & Timestamp
        ↓
Add to Storage
        ↓
Update localStorage
        ↓
Dispatch Event
        ↓
Component Update
```

### Read
```
Component Mount
        ↓
Call Hook (usePosts, useComments)
        ↓
Read from localStorage
        ↓
Parse JSON
        ↓
Return Data
        ↓
Component Render
```

### Update
```
Edit Form Submission
        ↓
Validation
        ↓
Find Item by ID
        ↓
Merge Updates
        ↓
Update localStorage
        ↓
Dispatch Event
        ↓
Component Update
```

### Delete
```
Delete Confirmation
        ↓
Find Item by ID
        ↓
Remove from Array
        ↓
Update localStorage
        ↓
Dispatch Event
        ↓
Component Update
```

## Component Hierarchy

```
RootLayout
├── AppProvider
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Search
│   │   └── User Menu
│   └── Page Content
│       ├── Home Page
│       │   ├── PostCard (multiple)
│       │   └── Sidebar
│       │       ├── Communities
│       │       └── Trending
│       ├── Login Page
│       ├── Signup Page
│       ├── Create Page
│       │   └── Form
│       ├── Post Detail Page
│       │   ├── PostCard
│       │   └── CommentSection
│       │       ├── Comment Form
│       │       └── Comments (multiple)
│       └── Admin Page
│           ├── Users Tab
│           └── Posts Tab
```

## Storage Schema

```
localStorage
├── reddit_posts: Post[]
│   ├── id: string
│   ├── title: string
│   ├── author: string
│   ├── authorId: string
│   ├── content: string
│   ├── timestamp: number
│   ├── upvotes: number
│   ├── downvotes: number
│   ├── commentsCount: number
│   └── community: string
│
├── reddit_comments: Record<string, Comment[]>
│   ├── postId: Comment[]
│   │   ├── id: string
│   │   ├── author: string
│   │   ├── authorId: string
│   │   ├── content: string
│   │   ├── timestamp: number
│   │   ├── upvotes: number
│   │   └── downvotes: number
│
├── reddit_users: User[]
│   ├── id: string
│   ├── username: string
│   ├── email: string
│   ├── avatar: string
│   ├── karma: number
│   ├── role: 'user' | 'admin' | 'moderator'
│   ├── createdAt: number
│   ├── passwordHash: string
│   └── isBanned: boolean
│
├── reddit_current_user: User | null
│
├── reddit_communities: Community[]
│   ├── id: string
│   ├── name: string
│   ├── description: string
│   ├── members: number
│   ├── icon: string
│   ├── createdAt: number
│   └── createdBy: string
│
├── reddit_votes: Vote[]
│   ├── userId: string
│   ├── postId: string
│   ├── commentId: string
│   ├── type: 'upvote' | 'downvote'
│   └── timestamp: number
│
└── reddit_storage_version: string
```

## File Organization

```
reddit-forum/
├── app/
│   ├── layout.tsx (Root layout with AppProvider)
│   ├── page.tsx (Home feed)
│   ├── globals.css (Global styles)
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── create/page.tsx
│   ├── admin/page.tsx
│   └── post/[id]/page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── PostCard.tsx
│   ├── CommentSection.tsx
│   └── Sidebar.tsx
│
├── context/
│   └── AppContext.tsx
│
├── lib/
│   ├── auth.ts (Authentication utilities)
│   ├── storage.ts (localStorage operations)
│   ├── hooks.ts (Custom React hooks)
│   ├── types.ts (TypeScript interfaces)
│   └── mockData.ts (Mock data)
│
├── public/
│   └── (Static assets)
│
└── Documentation files
    ├── PRODUCTION_README.md
    ├── USER_GUIDE.md
    ├── FEATURES_IMPLEMENTATION.md
    ├── BACKEND_INTEGRATION_GUIDE.md
    ├── TESTING_CHECKLIST.md
    ├── QUICK_REFERENCE.md
    └── ARCHITECTURE.md
```

## Technology Stack

```
Frontend Framework: Next.js 15
UI Library: React 19
Styling: Tailwind CSS v4
Language: TypeScript
State Management: React Context + Custom Hooks
Storage: localStorage (Browser)
Package Manager: npm
```

## Deployment Architecture

```
Development
├── npm run dev
└── http://localhost:3001

Production
├── npm run build
├── npm run start
└── Deployed to Vercel/Hosting

Backend Integration (Future)
├── Create lib/api.ts
├── Update lib/storage.ts
├── Update lib/hooks.ts
└── Deploy API Server
```


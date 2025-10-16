# Reddit-Style Forum Prototype - Features

## ✅ Implemented Features

### 🧍‍♂️ User Side

#### Landing Page / Feed
- ✅ Display posts list with title, author, timestamp, upvotes, comments count
- ✅ Mock data loaded from hardcoded arrays
- ✅ Responsive grid layout (1 column on mobile, 3 columns on desktop)
- ✅ Post cards with voting buttons
- ✅ Community sidebar with trending topics

#### View Post Page
- ✅ Detailed post view with full content
- ✅ Post metadata (author, community, timestamp)
- ✅ Image/emoji support
- ✅ Link support with clickable URLs
- ✅ Threaded comments section
- ✅ Comment voting (upvote/downvote)
- ✅ Delete own comments

#### Create Post Page
- ✅ Form with fields: title, content, link (optional), image emoji (optional)
- ✅ Community selection dropdown
- ✅ Save post data to localStorage
- ✅ Form validation
- ✅ Character counter for title
- ✅ Redirect to feed after posting

#### Commenting
- ✅ Add comments on posts
- ✅ Comments stored in localStorage
- ✅ Display comment author, timestamp, content
- ✅ Delete own comments
- ✅ Comment voting UI
- ✅ Real-time comment count updates

#### Voting System
- ✅ Upvote/downvote buttons on posts
- ✅ Upvote/downvote buttons on comments
- ✅ Vote counts update in real-time
- ✅ Votes persisted in localStorage

#### Basic Authentication Simulation
- ✅ Mock login page with username input
- ✅ Quick login buttons for demo accounts
- ✅ Username stored in localStorage
- ✅ Display username in navbar after login
- ✅ Logout functionality
- ✅ Guest browsing (no login required)

### 🧑‍💻 Admin Panel

#### Admin Dashboard
- ✅ Separate `/admin` route
- ✅ Tabbed interface (Posts / Users)
- ✅ List of all posts with details
- ✅ Delete posts functionality
- ✅ List of mock users with karma
- ✅ Post statistics (upvotes, downvotes, comments)
- ✅ Timestamp display for posts

### 🎨 UI / Design

#### Layout
- ✅ Forum-style layout similar to Reddit
- ✅ Left: Community navigation (sidebar)
- ✅ Center: Post feed
- ✅ Right: Trending topics / info panel
- ✅ Responsive design (mobile + desktop)

#### Components
- ✅ Navbar with logo, search, user info, login/logout
- ✅ Post cards with voting, metadata, stats
- ✅ Comment section with nested structure
- ✅ Sidebar with communities and trending
- ✅ Forms with validation
- ✅ Admin tables with sorting

#### Styling
- ✅ Tailwind CSS for all styling
- ✅ Consistent color scheme (orange primary)
- ✅ Hover effects and transitions
- ✅ Mobile-first responsive design
- ✅ Placeholder emojis for avatars and images

### 🗂️ Data Management

#### localStorage Integration
- ✅ Posts stored in localStorage
- ✅ Comments stored in localStorage (per post)
- ✅ User session stored in localStorage
- ✅ Votes persisted in localStorage
- ✅ Auto-initialization with mock data

#### Mock Data
- ✅ 5 sample posts
- ✅ 4 mock users with karma
- ✅ 4 mock communities
- ✅ 3 sample comments per post
- ✅ Realistic timestamps

## 🚀 Technical Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: localStorage + mock JSON
- **Routing**: Next.js App Router
- **State Management**: React hooks (useState, useEffect)

## 📁 Project Structure

```
reddit-forum/
├── app/
│   ├── page.tsx              # Home feed
│   ├── layout.tsx            # Root layout with navbar
│   ├── login/page.tsx        # Login page
│   ├── create/page.tsx       # Create post page
│   ├── post/[id]/page.tsx    # Post detail page
│   ├── admin/page.tsx        # Admin panel
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── PostCard.tsx          # Post card component
│   ├── Sidebar.tsx           # Sidebar with communities
│   └── CommentSection.tsx    # Comments section
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── mockData.ts           # Mock data
│   └── storage.ts            # localStorage utilities
└── public/                   # Static assets
```

## 🎯 How to Use

### Starting the App
```bash
cd reddit-forum
npm run dev
```
Visit `http://localhost:3000`

### Features to Try

1. **Browse Feed**: View all posts on the home page
2. **Login**: Click "Login" and enter a username or use quick login buttons
3. **Create Post**: Click "Create Post" in navbar (requires login)
4. **View Post**: Click any post to see full details and comments
5. **Comment**: Add comments on posts (requires login)
6. **Vote**: Click upvote/downvote buttons on posts and comments
7. **Admin Panel**: Click "Admin" in navbar to manage posts and users
8. **Logout**: Click "Logout" to clear session

## 💾 Data Persistence

All data is stored in browser's localStorage:
- `reddit_posts`: All posts
- `reddit_comments`: Comments organized by post ID
- `reddit_user`: Current logged-in user
- `reddit_votes`: Vote tracking

Data persists across page refreshes but is cleared when browser cache is cleared.

## 🔄 Mock Data

The app comes pre-loaded with:
- 5 sample posts about web development
- 4 demo user accounts (TechGuru, DesignNinja, CodeMaster, WebWizard)
- 4 communities (r/webdev, r/reactjs, r/nextjs, r/design)
- Sample comments on each post

## 📝 Notes

- This is a **frontend-only prototype** with no backend
- All data is stored locally in the browser
- No real authentication - just mock login
- Perfect for UI/UX testing and demonstrations
- Can be easily extended with a real backend API


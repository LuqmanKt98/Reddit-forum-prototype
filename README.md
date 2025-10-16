# 🔥 Reddit-Style Forum Prototype

A fully functional, frontend-only Reddit-style forum built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. Perfect for UI/UX testing, demonstrations, and as a foundation for backend integration.

## ✨ Features

### 🧍‍♂️ User Features
- 📰 **Home Feed**: Browse posts from all communities
- 📖 **Post Details**: View full post content with comments
- ✍️ **Create Posts**: Submit new posts with title, content, links, and images
- 💬 **Comments**: Add, view, and delete comments on posts
- 👍 **Voting**: Upvote/downvote posts and comments
- 🔐 **Mock Auth**: Simple login system with demo accounts
- 📱 **Responsive**: Works on mobile, tablet, and desktop

### 🧑‍💻 Admin Features
- 📊 **Admin Panel**: Manage posts and view user statistics
- 🗑️ **Delete Posts**: Remove posts from the system
- 👥 **User Management**: View all users and their karma

### 💾 Data Management
- 📦 **localStorage**: All data persists in browser
- 🎲 **Mock Data**: Pre-loaded with sample posts, users, and communities
- 🔄 **Real-time Updates**: Changes reflect immediately

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd reddit-forum
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Step-by-step guide to using the app
- **[FEATURES.md](./FEATURES.md)** - Detailed feature list
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - How to add a real backend
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview

## 🎯 Demo Accounts

Quick login with these demo accounts:
- **TechGuru** - Tech enthusiast
- **DesignNinja** - UI/UX Designer
- **CodeMaster** - Full-stack developer
- **WebWizard** - Web specialist

Or create your own account with any username!

## 🗂️ Project Structure

```
reddit-forum/
├── app/
│   ├── page.tsx              # Home feed
│   ├── layout.tsx            # Root layout
│   ├── login/page.tsx        # Login page
│   ├── create/page.tsx       # Create post
│   ├── post/[id]/page.tsx    # Post details
│   └── admin/page.tsx        # Admin panel
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── PostCard.tsx          # Post display
│   ├── Sidebar.tsx           # Communities
│   └── CommentSection.tsx    # Comments
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── mockData.ts           # Sample data
│   └── storage.ts            # localStorage helpers
└── public/                   # Static assets
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **localStorage** | Data persistence |

## 💡 Key Features Explained

### Home Feed
- Displays all posts in a clean card layout
- Shows post title, author, timestamp, upvotes, and comment count
- Click any post to view full details
- Sidebar with communities and trending topics

### Create Post
- Form with title, content, link, and image emoji fields
- Community selection dropdown
- Form validation
- Auto-saves to localStorage

### Post Details
- Full post content with metadata
- Comments section with add/delete functionality
- Voting system for posts and comments
- Related post information

### Admin Panel
- View all posts with statistics
- Delete posts with confirmation
- View all users and their karma
- Tabbed interface for easy navigation

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
localStorage Utility (lib/storage.ts)
    ↓
Browser localStorage
    ↓
Data Persists Across Sessions
```

## 📊 Mock Data Included

- **5 Sample Posts** about web development
- **4 Demo Users** with karma scores
- **4 Communities** (r/webdev, r/reactjs, r/nextjs, r/design)
- **3 Sample Comments** per post

## 🎨 Design Highlights

- **Color Scheme**: Orange primary (#FF6B35), gray neutrals
- **Responsive**: Mobile-first design
- **Smooth Animations**: Hover effects and transitions
- **Accessible**: Semantic HTML and ARIA labels
- **Modern UI**: Clean, minimalist design

## 🧪 Testing the App

### Try These Actions
1. ✅ Browse the home feed
2. ✅ Click on a post to view details
3. ✅ Login with a demo account
4. ✅ Create a new post
5. ✅ Add comments to posts
6. ✅ Vote on posts and comments
7. ✅ Delete your own comments
8. ✅ Access the admin panel
9. ✅ Delete posts from admin
10. ✅ Logout and verify data persists

## 🚀 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔐 Authentication

**Current**: Mock login with username only (no password)
**Future**: Real authentication with Firebase, Auth0, or custom backend

## 💾 Data Persistence

All data is stored in browser's localStorage:
- `reddit_posts` - All posts
- `reddit_comments` - Comments by post
- `reddit_user` - Current user session
- `reddit_votes` - Vote tracking

Data persists across page refreshes but is cleared when browser cache is cleared.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
- Netlify
- GitHub Pages
- AWS Amplify
- Railway
- Render

## 🔗 Backend Integration

Ready to add a real backend? See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for:
- API layer setup
- Database schema
- Authentication integration
- Firebase/Supabase examples
- Migration checklist

## 📈 Future Enhancements

- [ ] Real backend API
- [ ] User authentication
- [ ] Search functionality
- [ ] Post filtering
- [ ] User profiles
- [ ] Notifications
- [ ] Real-time updates
- [ ] Moderation tools
- [ ] Analytics
- [ ] Dark mode

## 🐛 Troubleshooting

### Server won't start
```bash
rm -r node_modules
npm install
npm run dev
```

### Port 3000 in use
```bash
npm run dev -- -p 3001
```

### Data not persisting
- Check localStorage is enabled in browser
- Open DevTools (F12) → Application → Local Storage
- Look for keys starting with `reddit_`

### Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh page (Ctrl+Shift+R)
- Restart dev server

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify localStorage is enabled
3. Clear cache and restart server
4. Review documentation files

## 📄 License

Open source - feel free to use for personal and commercial projects.

## 🙏 Built With

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

---

**Status**: ✅ Complete and Ready to Use

**Version**: 1.0.0

**Last Updated**: 2024

Happy coding! 🚀

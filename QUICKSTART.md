# Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Navigate to project directory**
   ```bash
   cd reddit-forum
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The app will auto-reload on file changes

## Demo Walkthrough

### 1. Landing Page
- You'll see the home feed with 5 sample posts
- Each post shows title, author, timestamp, upvotes, and comment count
- Click any post to view details

### 2. Login (Optional)
- Click "Login" button in top-right navbar
- Enter any username (minimum 3 characters)
- Or click one of the quick login buttons:
  - TechGuru
  - DesignNinja
  - CodeMaster
  - WebWizard

### 3. Create a Post
- After logging in, click "Create Post" button
- Fill in the form:
  - **Title** (required): Post title
  - **Community**: Select from dropdown
  - **Content**: Main post text
  - **Link** (optional): URL to external resource
  - **Image Emoji** (optional): Single emoji like 🖼️ or 📸
- Click "Post" to submit

### 4. View Post Details
- Click on any post title to open full post view
- See complete post content, image, and link
- View all comments below

### 5. Comment on Posts
- Scroll to comments section
- If logged in, you'll see a comment form
- Type your comment and click "Comment"
- Your comment appears at the top of the list
- Click "Delete" to remove your own comments

### 6. Vote on Posts & Comments
- Click ⬆️ to upvote
- Click ⬇️ to downvote
- Vote count updates in real-time
- Works on both posts and comments

### 7. Admin Panel
- After logging in, click "Admin" in navbar
- **Posts Tab**: See all posts with stats
  - View post title, author, community, creation date
  - See upvotes, downvotes, comment count
  - Delete posts with confirmation
- **Users Tab**: See all mock users
  - View username, avatar, karma score
  - User status

### 8. Logout
- Click "Logout" button in navbar
- Session is cleared from localStorage
- You'll be redirected to login page

## Key Features to Explore

### Responsive Design
- Resize browser window to see mobile layout
- Sidebar hides on small screens
- Posts adapt to screen size

### Data Persistence
- Create a post and refresh the page
- Post still appears (stored in localStorage)
- Comments persist across sessions
- Vote counts are saved

### Mock Communities
- Posts are organized by community
- Communities shown in sidebar:
  - r/webdev
  - r/reactjs
  - r/nextjs
  - r/design

### Trending Section
- Right sidebar shows trending topics
- Click to filter (demo only)

## Troubleshooting

### Server won't start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Data not persisting
- Check browser's localStorage is enabled
- Open DevTools (F12) → Application → Local Storage
- Look for keys starting with `reddit_`

### Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Hard refresh page (Ctrl+Shift+R)

## File Structure Quick Reference

```
app/
  page.tsx           → Home feed
  login/page.tsx     → Login page
  create/page.tsx    → Create post form
  post/[id]/page.tsx → Post details
  admin/page.tsx     → Admin dashboard

components/
  Navbar.tsx         → Top navigation
  PostCard.tsx       → Post display
  Sidebar.tsx        → Communities & trending
  CommentSection.tsx → Comments & replies

lib/
  types.ts           → TypeScript types
  mockData.ts        → Sample data
  storage.ts         → localStorage helpers
```

## Next Steps

### To Extend the App
1. **Add Backend**: Replace localStorage with API calls
2. **Real Auth**: Integrate Firebase or Auth0
3. **Database**: Add MongoDB, PostgreSQL, or Supabase
4. **Search**: Implement post search functionality
5. **Filtering**: Add category/community filtering
6. **Notifications**: Add real-time notifications
7. **User Profiles**: Create user profile pages
8. **Moderation**: Add post/comment moderation tools

### To Customize
1. Change colors in Tailwind classes
2. Modify mock data in `lib/mockData.ts`
3. Add new communities
4. Customize post fields
5. Add more voting options

## Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify localStorage is enabled
3. Clear cache and restart server
4. Check that all files are created correctly

Enjoy exploring the Reddit-style forum prototype! 🚀


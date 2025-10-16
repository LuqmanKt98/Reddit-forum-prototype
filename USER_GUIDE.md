# Reddit-Style Forum - User Guide

## Getting Started

### 1. Accessing the Application
- Navigate to `http://localhost:3001`
- You'll be redirected to the login page if not authenticated

### 2. Login Options

#### Option A: Quick Login (Demo Accounts)
Click any of the demo account buttons:
- **TechGuru** - Regular user
- **DesignNinja** - Regular user
- **CodeMaster** - Moderator
- **WebWizard** - Regular user

All demo accounts use password: `password123`

#### Option B: Admin Login
- Username: `Admin`
- Password: `admin123`

#### Option C: Create New Account
1. Click "Sign up here" link
2. Enter username (3-20 characters, alphanumeric + underscore/hyphen)
3. Enter password (minimum 6 characters)
4. Confirm password
5. Optionally add email
6. Click "Create Account"

### 3. Home Feed
- View all posts from all communities
- Posts are sorted by newest first
- Click on any post to view details and comments
- Use the sidebar to browse communities

### 4. Creating Posts
1. Click "✍️ Create" in the navbar
2. Select a community
3. Enter post title (max 300 characters)
4. Add content (optional if link provided)
5. Add link (optional if content provided)
6. Add image emoji (optional)
7. Click "🚀 Post"

### 5. Voting
- Click ⬆️ to upvote
- Click ⬇️ to downvote
- Click again to remove your vote
- Vote counts update in real-time

### 6. Comments
1. Click on a post to view details
2. Scroll to comment section
3. Enter your comment
4. Click "Comment" to post
5. Vote on comments using ⬆️ and ⬇️

### 7. User Profile
- Your username appears in the navbar
- Click your username to see profile options
- View your posts and comments

### 8. Admin Features (Admin Only)
- Click "⚙️ Admin" in navbar
- View all posts and users
- Delete posts or users
- Manage community settings

## Features

### Posts
- ✅ Create posts
- ✅ View posts
- ✅ Vote on posts
- ✅ Comment on posts
- ✅ Edit own posts
- ✅ Delete own posts
- ✅ Admin can delete any post

### Comments
- ✅ Add comments
- ✅ Vote on comments
- ✅ Delete own comments
- ✅ Admin can delete any comment
- ⏳ Reply to comments (coming soon)

### Communities
- ✅ Browse communities
- ✅ Filter posts by community
- ✅ View community info
- ⏳ Create communities (admin only)
- ⏳ Subscribe to communities

### User Management
- ✅ Create account
- ✅ Login/logout
- ✅ View profile
- ✅ Track karma
- ⏳ Edit profile
- ⏳ User preferences

### Admin Features
- ✅ View all users
- ✅ View all posts
- ✅ Delete posts
- ✅ Delete users
- ✅ Ban users
- ⏳ Promote moderators
- ⏳ Community management

## Data Storage

All data is stored locally in your browser's localStorage:
- Posts
- Comments
- Users
- Communities
- Votes
- Current session

**Note**: Data persists across page reloads but is cleared if you clear browser cache.

## Demo Data

The application comes pre-loaded with:
- 5 demo users (including admin)
- 4 communities
- 5 sample posts
- 3 sample comments per post

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Search (coming soon)
- `Ctrl/Cmd + /` - Help (coming soon)

## Tips & Tricks

1. **Quick Login**: Use demo accounts to quickly test features
2. **Admin Testing**: Login as Admin to test moderation features
3. **Multiple Accounts**: Create multiple accounts to test interactions
4. **Data Persistence**: Refresh the page - your session persists
5. **Clear Data**: Clear browser cache to reset all data

## Troubleshooting

### Can't Login
- Check username and password
- Ensure account exists
- Try a demo account first

### Posts Not Showing
- Refresh the page
- Check if you're in the right community
- Ensure you're logged in

### Comments Not Saving
- Ensure you're logged in
- Check comment length
- Refresh page to see updates

### Admin Features Not Available
- Login as Admin account
- Check user role in storage

## Browser Compatibility

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Performance Notes

- All operations are instant (localStorage)
- No network latency
- Data syncs across tabs
- Smooth animations and transitions

## Future Features

- [ ] Real-time notifications
- [ ] User mentions (@username)
- [ ] Hashtags
- [ ] Direct messaging
- [ ] User profiles
- [ ] Post editing history
- [ ] Advanced search
- [ ] Trending posts
- [ ] User recommendations
- [ ] Post scheduling

## Support

For issues or feature requests, check the documentation files:
- `PRODUCTION_IMPLEMENTATION_PLAN.md` - Implementation roadmap
- `FEATURES_IMPLEMENTATION.md` - Detailed feature list
- `PRODUCTION_IMPLEMENTATION_PROGRESS.md` - Current progress


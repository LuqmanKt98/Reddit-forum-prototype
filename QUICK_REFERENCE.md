# Quick Reference Guide

## 🚀 Start Here

1. **Install**: `npm install`
2. **Run**: `npm run dev`
3. **Open**: http://localhost:3001
4. **Login**: Use demo accounts (password: `password123`)

## 📚 Documentation Map

| Document | Purpose |
|----------|---------|
| `PRODUCTION_README.md` | Project overview and setup |
| `USER_GUIDE.md` | How to use the application |
| `FEATURES_IMPLEMENTATION.md` | Detailed feature list |
| `BACKEND_INTEGRATION_GUIDE.md` | How to add a backend |
| `TESTING_CHECKLIST.md` | Testing procedures |
| `IMPLEMENTATION_COMPLETE.md` | What was delivered |

## 🔑 Demo Accounts

```
Username: TechGuru
Password: password123
Role: User

Username: Admin
Password: admin123
Role: Administrator
```

## 📁 Key Files

### Authentication
- `lib/auth.ts` - Auth utilities
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page

### Data Management
- `lib/storage.ts` - localStorage operations
- `lib/hooks.ts` - Custom hooks
- `context/AppContext.tsx` - Global state

### Pages
- `app/page.tsx` - Home feed
- `app/create/page.tsx` - Create post
- `app/post/[id]/page.tsx` - Post detail
- `app/admin/page.tsx` - Admin panel

## 🎯 Common Tasks

### Create a Post
1. Click "✍️ Create" in navbar
2. Select community
3. Enter title and content
4. Click "🚀 Post"

### Add a Comment
1. Click on a post
2. Scroll to comments
3. Enter comment text
4. Click "Comment"

### Vote on Content
- Click ⬆️ to upvote
- Click ⬇️ to downvote
- Click again to remove vote

### Create Account
1. Click "Sign up here" on login page
2. Enter username (3-20 chars)
3. Enter password (6+ chars)
4. Confirm password
5. Click "Create Account"

### Access Admin Panel
1. Login as Admin
2. Click "⚙️ Admin" in navbar
3. Manage users and posts

## 🔧 Development

### Build
```bash
npm run build
```

### Production
```bash
npm run start
```

### Lint
```bash
npm run lint
```

## 📊 Data Storage

All data in localStorage:
- `reddit_posts` - Posts
- `reddit_comments` - Comments
- `reddit_users` - Users
- `reddit_current_user` - Session
- `reddit_communities` - Communities
- `reddit_votes` - Votes

## 🎨 Styling

- Dark theme: `#0f0f23` to `#1a1a2e`
- Primary: Purple (`#a855f7`)
- Secondary: Pink (`#ec4899`)
- Glass effect: `backdrop-filter: blur(10px)`

## 🔐 User Roles

| Role | Permissions |
|------|-------------|
| User | Create posts/comments, vote |
| Moderator | + Delete any post/comment |
| Admin | + Manage users, ban users |

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🐛 Debugging

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
```

### Check Errors
- Open DevTools (F12)
- Go to Console tab
- Look for error messages

## 🔄 Backend Integration Steps

1. Create `lib/api.ts`
2. Update `lib/storage.ts`
3. Update `lib/hooks.ts`
4. Add loading states
5. Test thoroughly

See `BACKEND_INTEGRATION_GUIDE.md` for details.

## 📋 Testing

Run through `TESTING_CHECKLIST.md`:
- Authentication tests
- CRUD operations
- UI/UX tests
- Performance tests
- Browser compatibility

## 🌐 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 📞 Troubleshooting

### Can't Login
- Check username/password
- Try demo account
- Clear browser cache

### Posts Not Showing
- Refresh page
- Check community filter
- Verify logged in

### Comments Not Saving
- Ensure logged in
- Check comment length
- Refresh page

### Admin Features Missing
- Login as Admin
- Check user role
- Verify permissions

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Deploy to Vercel
```bash
vercel deploy
```

## 📈 Performance Tips

- Use custom hooks
- Memoize components
- Lazy load images
- Optimize bundle size
- Use CDN for assets

## 🎓 Learning Path

1. Read `PRODUCTION_README.md`
2. Try demo accounts
3. Create a post
4. Add a comment
5. Test admin features
6. Read `FEATURES_IMPLEMENTATION.md`
7. Review code structure
8. Study `BACKEND_INTEGRATION_GUIDE.md`

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 📝 File Structure

```
reddit-forum/
├── app/                    # Pages and layouts
├── components/             # React components
├── context/                # Global state
├── lib/                    # Utilities and hooks
├── public/                 # Static files
└── Documentation files     # Guides and references
```

## ✅ Checklist Before Deployment

- [ ] All tests passed
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Backend integration ready
- [ ] Environment variables set
- [ ] Build successful

## 🎉 You're Ready!

The application is production-ready. Start by:
1. Running `npm run dev`
2. Testing with demo accounts
3. Reading the documentation
4. Integrating with your backend

---

**Need Help?** Check the documentation files in the root directory.


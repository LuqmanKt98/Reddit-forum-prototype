# Testing Guide

## Manual Testing Checklist

### 1. Home Feed
- [ ] Page loads without errors
- [ ] All 5 sample posts display
- [ ] Posts show correct information (title, author, timestamp, votes, comments)
- [ ] Sidebar displays communities
- [ ] Sidebar displays trending topics
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Upvote/downvote buttons work
- [ ] Vote counts update in real-time

### 2. Login Page
- [ ] Login page accessible from navbar
- [ ] Can enter custom username
- [ ] Username validation works (min 3 characters)
- [ ] Quick login buttons work for all 4 demo accounts
- [ ] After login, redirected to home page
- [ ] Username appears in navbar after login
- [ ] Can browse as guest without login

### 3. Create Post
- [ ] Create Post button visible after login
- [ ] Create Post button hidden when not logged in
- [ ] Form displays all fields (title, community, content, link, image)
- [ ] Title field has character counter
- [ ] Community dropdown shows all 4 communities
- [ ] Form validation works (title required)
- [ ] Can submit post with just title and content
- [ ] Can submit post with all fields
- [ ] Post appears at top of feed after creation
- [ ] Post data persists after page refresh
- [ ] Cancel button returns to feed

### 4. Post Details
- [ ] Clicking post opens detail page
- [ ] Full post content displays
- [ ] Post metadata shows (author, community, timestamp)
- [ ] Image emoji displays if present
- [ ] Link is clickable and opens in new tab
- [ ] Comments section displays
- [ ] Comment count matches actual comments
- [ ] Back button returns to feed
- [ ] Upvote/downvote buttons work
- [ ] Vote counts update

### 5. Comments
- [ ] Comment form visible when logged in
- [ ] Comment form hidden when not logged in
- [ ] Can add comment with text
- [ ] Comment appears at top of list after posting
- [ ] Comment shows author, timestamp, content
- [ ] Comment count updates on post
- [ ] Can delete own comments
- [ ] Delete button only shows for own comments
- [ ] Upvote/downvote buttons work on comments
- [ ] Comments persist after page refresh

### 6. Voting System
- [ ] Upvote button increments count
- [ ] Downvote button increments count
- [ ] Vote counts display correctly
- [ ] Votes persist after page refresh
- [ ] Works on both posts and comments
- [ ] Vote count calculation correct (upvotes - downvotes)

### 7. Admin Panel
- [ ] Admin link visible in navbar when logged in
- [ ] Admin link hidden when not logged in
- [ ] Admin page loads without errors
- [ ] Posts tab shows all posts
- [ ] Posts table displays correct columns
- [ ] User tab shows all 4 mock users
- [ ] User table displays correct columns
- [ ] Can delete posts with confirmation
- [ ] Post disappears from feed after deletion
- [ ] Can switch between tabs
- [ ] Back button returns to feed

### 8. Navigation
- [ ] Navbar displays on all pages
- [ ] Logo links to home
- [ ] Search bar displays (demo only)
- [ ] Login/Logout buttons work
- [ ] Create Post button appears after login
- [ ] Admin button appears after login
- [ ] User info displays after login
- [ ] Navbar responsive on mobile

### 9. Data Persistence
- [ ] Create post and refresh page - post still there
- [ ] Add comment and refresh page - comment still there
- [ ] Vote on post and refresh page - votes still there
- [ ] Login and refresh page - still logged in
- [ ] Logout and refresh page - logged out
- [ ] Open DevTools → Application → Local Storage
- [ ] Verify `reddit_posts` key exists
- [ ] Verify `reddit_comments` key exists
- [ ] Verify `reddit_user` key exists

### 10. Responsive Design
- [ ] Test on mobile (375px width)
  - [ ] Single column layout
  - [ ] Sidebar hidden
  - [ ] Navbar responsive
  - [ ] Forms readable
- [ ] Test on tablet (768px width)
  - [ ] 2 column layout
  - [ ] Sidebar visible
  - [ ] Content readable
- [ ] Test on desktop (1024px+ width)
  - [ ] 3 column layout
  - [ ] Sidebar visible
  - [ ] Optimal spacing

### 11. Error Handling
- [ ] Try creating post without title - error shows
- [ ] Try creating post without content/link - error shows
- [ ] Try logging in with username < 3 chars - error shows
- [ ] Try accessing post with invalid ID - error page shows
- [ ] Try accessing admin without login - redirects to login

### 12. Performance
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Smooth scrolling
- [ ] Buttons respond immediately
- [ ] Forms submit quickly
- [ ] No lag when voting

## Browser Testing

### Chrome/Edge
- [ ] All features work
- [ ] localStorage works
- [ ] Responsive design works
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] localStorage works
- [ ] Responsive design works
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] localStorage works
- [ ] Responsive design works
- [ ] No console errors

## Device Testing

### Desktop
- [ ] 1920x1080 resolution
- [ ] 1366x768 resolution
- [ ] 1024x768 resolution

### Tablet
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] Android tablet (600x1024)

### Mobile
- [ ] iPhone 12 (390x844)
- [ ] iPhone SE (375x667)
- [ ] Android phone (360x800)

## Accessibility Testing

- [ ] Can navigate with keyboard only
- [ ] Tab order is logical
- [ ] Buttons have focus states
- [ ] Links are underlined or clearly marked
- [ ] Color contrast is sufficient
- [ ] Form labels are associated with inputs
- [ ] Error messages are clear

## Test Scenarios

### Scenario 1: New User
1. Open app
2. Browse feed as guest
3. Click on post
4. Try to comment (should prompt login)
5. Login with custom username
6. Create a post
7. Add comment to another post
8. Vote on posts
9. Logout

### Scenario 2: Admin User
1. Login as admin
2. Create multiple posts
3. Go to admin panel
4. View all posts
5. Delete a post
6. Verify post removed from feed
7. View users
8. Logout

### Scenario 3: Data Persistence
1. Create post
2. Add comment
3. Vote on post
4. Refresh page
5. Verify all data still there
6. Close browser
7. Reopen browser
8. Verify data still there

### Scenario 4: Mobile User
1. Open on mobile device
2. Browse feed
3. Click post
4. Add comment
5. Vote
6. Create post
7. Access admin
8. Verify all works on mobile

## Known Limitations

- No real backend (data only in localStorage)
- No real authentication (username only)
- No search functionality
- No filtering
- No user profiles
- No notifications
- No real-time updates
- localStorage limited to ~5-10MB

## Performance Benchmarks

- Page load: < 2 seconds
- Post creation: < 500ms
- Comment submission: < 300ms
- Vote update: < 100ms
- Admin page load: < 1 second

## Bug Report Template

```
Title: [Brief description]

Description:
[Detailed description of the issue]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [etc]

Expected Result:
[What should happen]

Actual Result:
[What actually happens]

Browser: [Chrome/Firefox/Safari/Edge]
Device: [Desktop/Tablet/Mobile]
OS: [Windows/Mac/Linux/iOS/Android]

Screenshots: [If applicable]
```

## Continuous Testing

### Before Each Commit
- [ ] Run `npm run lint`
- [ ] Test all major features
- [ ] Check console for errors
- [ ] Test on mobile
- [ ] Verify data persistence

### Before Deployment
- [ ] Run full test suite
- [ ] Test on all browsers
- [ ] Test on all devices
- [ ] Performance check
- [ ] Security review
- [ ] Accessibility check

## Automated Testing (Future)

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Support

For testing issues or questions:
1. Check browser console (F12)
2. Verify localStorage is enabled
3. Clear cache and restart
4. Check documentation
5. Review this testing guide


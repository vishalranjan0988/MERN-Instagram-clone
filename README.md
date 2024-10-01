
# Instagram Clone MERN

This is Instagram clone with features like user registration, JWT-secured login, photo uploads via Cloudinary, likes, comments, profile viewing, and logout, built using React.js, Node.js, Express.js, and MongoDB.

[Visit Now](https://instagramvishal.vercel.app) 🚀 

## 🖥️ Tech Stack

**Frontend:** React.js

**Server:** Node.js, Express.js

**Database:** MongoDB

**Cloud Storage:** Cloudinary


## 🚀 Features

**User Registration and Login:**
- Secure user authentication with bcrypt and JWT tokens.
- Register and log in with email and password.

**User Profiles:**
- View and update user profiles with profile pictures.
- Follow/unfollow other users.
- Display posts made by users on their profile pages.

**Posting Photos:**
- Users can upload and share photos.
- Image storage and display using cloud storage (e.g., Cloudinary).

**Likes and Comments:**
- Like or unlike posts.
- Add comments to posts.
- Real-time updates to likes and comments counts.

**Feed:** 
- Display a feed of posts from followed users.
- Scrollable timeline to browse all posts.

**Logout:**
- Securely log out of the application with token invalidation.

**Responsive Design:**
- Mobile-friendly UI for a seamless experience on all device sizes.

## Installation

**1. Clone the repository:**
```
git clone https://github.com/vishalranjan0988/MERN-Instagram-clone.git
```
**2. Install server-side dependencies:**
``` 
cd server
npm install
```
**3. Install client-side dependencies:**
``` 
cd client
npm install
```
**4. Set up environment variables:**

*server side :*

```
mongoUrl =
Jwt_secret = 
PORT = 5001
```
*client side :*
```
REACT_APP_BASE_URL=http://localhost:5001
``` 

**5. Start the development servers:**

Start the backend and frontend concurrently:

- Open one terminal to start the backend:
```
cd server
nodemon app.js
```

- Open a second terminal for the frontend:
```
cd client
npm start
```








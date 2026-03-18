<p>
  <img src="./Frontend/public/PixoraLogo.png" width="120" />
</p>

<h1 align="center">Pixora</h1>

<p align="center">
  Build • Share • Connect
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green" />
  <img src="https://img.shields.io/badge/Status-Active-blue" />
  <img src="https://img.shields.io/badge/Frontend-React-orange" />
  <img src="https://img.shields.io/badge/Backend-Node.js-yellow" />
</p>

---

Pixora is a modern fullstack social media platform built using the MERN stack.

It focuses on clean UI, scalable backend architecture and real-world features like authentication, follow system, posts and user interactions.

---

# 📂 Project Structure

## 🔧 Backend

- Express server setup
- MVC architecture (Routes + Controllers + Models)
- MongoDB database connection
- JWT based authentication middleware
- Multer for image handling
- ImageKit cloud storage integration

## 🎨 Frontend

- React + Vite setup
- Feature based architecture
- Authentication pages (Login / Register)
- SCSS architecture with variables and mixins
- Reusable form styles
- React Router based page navigation
- Auth context and custom hooks

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- ImageKit

## Frontend

- React
- React Router
- SCSS
- Vite

---

# ✨ Features Implemented

## 🔐 Authentication

- User registration
- User login
- Secure password hashing using bcryptjs
- JWT authentication with cookies
- Authentication middleware for protected routes
- Login and Register UI

---

## 👤 User System

- Unique username and email validation
- Default profile image support
- Follow user
- Unfollow user
- Prevent duplicate follow relationships
- Follow request system for private accounts

---

## 📸 Post System

- Create post
- Upload images using multer memoryStorage
- Cloud image storage using ImageKit
- Get all posts of a user
- Get post details

---

## 🤝 Social Features

- Follow / Unfollow user
- Follow request system
- Accept / Reject follow requests
- Followers list
- Following list
- Like a post
- Prevent duplicate likes using compound index

---

# 🧠 Database Design Concepts

- Edge collection pattern for follow relationships
- Compound indexes to prevent duplicate actions
- Separate collections for follows and likes for scalability

---

# 🚧 Status

Backend authentication, follow system, post system and like functionality completed.

Frontend authentication system with UI and structure implemented.

Project under active development.

---

# 💡 Vision

Pixora aims to become a scalable and production-ready social media platform with modern UI, optimized backend performance and real-world architecture.

---
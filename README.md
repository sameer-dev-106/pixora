# Instagram Clone MERN

A fullstack Instagram clone built using Node.js, Express, MongoDB and React.

---

# Project Structure

## Backend

- Express server setup
- MVC architecture (Routes + Controllers + Models)
- MongoDB database connection
- JWT based authentication middleware
- Multer for image handling
- ImageKit cloud storage integration

## Frontend

- React + Vite setup
- Feature based architecture
- Authentication pages (Login / Register)
- SCSS architecture with variables and mixins
- Reusable form styles
- React Router based page navigation

---

# Tech Stack

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

# Features Implemented

## Authentication

- User registration
- User login
- Secure password hashing using bcryptjs
- JWT authentication with cookies
- Authentication middleware for protected routes
- Login and Register UI

---

## User System

- Unique username and email validation
- Default profile image support
- Follow user
- Unfollow user
- Prevent duplicate follow relationships
- Follow request system for private accounts

---

## Post System

- Create post
- Upload images using multer memoryStorage
- Cloud image storage using ImageKit
- Get all posts of a user
- Get post details

---

## Social Features

- Follow / Unfollow user
- Follow request system
- Accept / Reject follow requests
- Followers list
- Following list
- Like a post
- Prevent duplicate likes using compound index

---

# Database Design Concepts

- Edge collection pattern for follow relationships
- Compound indexes to prevent duplicate actions
- Separate collections for follows and likes for scalability

---

# Status

Backend authentication, follow system, post system and like functionality completed.

Frontend authentication UI setup completed.

Project under active development.
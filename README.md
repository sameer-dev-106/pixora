# Instagram Clone MERN

A fullstack Instagram clone built using Node.js, Express, MongoDB and React.

## Project Structure

Backend
- Express server setup
- MVC architecture (Routes + Controllers + Models)
- MongoDB database connection
- JWT based authentication middleware
- Multer for image handling
- ImageKit cloud storage integration

Frontend
- Coming soon

## Tech Stack

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- ImageKit

## Features Implemented

### Authentication
- User registration
- User login
- Secure password hashing using bcryptjs
- JWT authentication with cookies
- Authentication middleware for protected routes

### User System
- Unique username and email validation
- Default profile image support
- Follow user
- Unfollow user
- Prevent duplicate follow relationships

### Post System
- Create post
- Upload images using multer memoryStorage
- Cloud image storage using ImageKit
- Get all posts of a user
- Get post details

### Social Features
- Follow / Unfollow user
- Like a post
- Prevent duplicate likes using compound index

## Database Design Concepts

- Edge collection pattern for follow relationships
- Compound indexes to prevent duplicate actions
- Separate collections for follows and likes for scalability

## Status

Backend authentication, follow system, post system and like functionality completed.

Project under active development.
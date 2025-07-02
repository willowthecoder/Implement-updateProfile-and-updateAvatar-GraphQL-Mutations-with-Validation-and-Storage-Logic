# Learning Management System (LMS) Backend

A modern Learning Management System backend built with Node.js, TypeScript, Express, Apollo GraphQL, MongoDB, and Auth0.

## Features

- 🔐 Authentication & Authorization with Auth0
- 📊 GraphQL API with Apollo Server
- 🗄️ MongoDB Database with Mongoose
- 📝 TypeScript for type safety
- 🚀 Express.js server
- 🔄 Optional Redis caching
- 📝 Comprehensive logging

## Prerequisites

- Node.js (v18 or later)
- MongoDB
- Redis (optional)
- Auth0 account

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lms-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   NODE_ENV=development
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/lms
   AUTH0_DOMAIN=your-auth0-domain.auth0.com
   AUTH0_AUDIENCE=your-api-identifier
   REDIS_URL=redis://localhost:6379
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── config/         # Configuration files
├── graphql/        # GraphQL schema and resolvers
├── middleware/     # Express middlewares
├── models/         # Mongoose models
├── services/       # Business logic
└── utils/          # Utility functions
```

## API Documentation

The GraphQL API is available at `http://localhost:4000/graphql` when running locally.

### Available Queries

- `me`: Get current user information
- `users`: Get all users (requires admin role)

### Available Mutations

- `updateProfile`: Update user profile information

## Authentication

This project uses Auth0 for authentication. Make sure to:

1. Create an Auth0 application
2. Set up API in Auth0
3. Configure the environment variables
4. Use the provided Auth0 token in your GraphQL requests

## License

ISC 
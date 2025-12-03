# Mental Health Support Platform

A MERN stack application providing students with mental health support through mood tracking, resource access, and counselor support.

## Features

### For Students:
- User registration and authentication
- Mood tracking with daily entries
- Access to psychoeducational resources
- Support request system
- Dashboard with mood history

### For Counselors/Admins:
- Admin dashboard to manage support requests
- Resource management (create, update, delete)
- Student support tracking

## Tech Stack

- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express, MongoDB with Mongoose
- **Authentication**: JWT
- **Styling**: CSS with modern UI components

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mentalhealth
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Default Users (after seeding)

- **Admin**: admin@example.com / admin123
- **Counselor**: counselor@example.com / counselor123
- **Student**: student@example.com / student123

## Project Structure

```
mental-health-support/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── seed.js
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login for students, counselors, and admins
- `GET /api/auth/me` - Get current user profile

### Mood Tracking
- `POST /api/mood` - Create a new mood entry
- `GET /api/mood` - Get user's mood history

### Resources
- `GET /api/resources` - Get all resources (with optional search)
- `POST /api/resources` - Create a new resource (admin/counselor only)
- `PUT /api/resources/:id` - Update a resource (admin/counselor only)
- `DELETE /api/resources/:id` - Delete a resource (admin/counselor only)

### Support Requests
- `POST /api/support` - Create a new support request
- `GET /api/support/my` - Get current user's support requests
- `GET /api/support` - Get all support requests (admin/counselor only)
- `PUT /api/support/:id` - Update a support request (admin/counselor only)

## Disclaimer

This platform does not replace professional medical or emergency services. In an emergency, contact your local emergency number or campus helpline.
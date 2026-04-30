# Student Grade Tracker

A beginner-friendly full-stack MERN project for tracking student grades with JWT authentication, subject-wise CRUD operations, and a clean Bootstrap UI.

## Project Structure

```text
GradeTracker/
  client/   -> React app (Create React App)
  server/   -> Node.js + Express backend
```

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected dashboard and grade routes
- Add, edit, delete, and list grades
- Automatic percentage and grade calculation
- Search grades by subject
- Toast notifications, loading states, and delete confirmation
- Responsive Bootstrap UI

## Backend Setup

1. Open a terminal in `server`.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using `server/.env.example`.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student-grade-tracker
JWT_SECRET=your_jwt_secret_key
```

Important:
`JWT_SECRET` is required. If it is missing, login may appear to work incorrectly and protected routes like saving grades will fail.

4. Start the backend:

```bash
npm run server
```

The API runs on `http://localhost:5000`.

## Frontend Setup

1. Open another terminal in `client`.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using `client/.env.example`.

Example:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:

```bash
npm start
```

The frontend runs on `http://localhost:3000`.

## API Routes

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Grade Routes

- `GET /api/grades`
- `POST /api/grades`
- `GET /api/grades/:id`
- `PUT /api/grades/:id`
- `DELETE /api/grades/:id`

## Grade Rules

- `A` = 90 and above
- `B` = 75 to 89
- `C` = 60 to 74
- `D` = 50 to 59
- `F` = below 50

## MongoDB Notes

You can use either:

- Local MongoDB:
  `mongodb://127.0.0.1:27017/student-grade-tracker`
- MongoDB Atlas:
  Replace `MONGO_URI` with your Atlas connection string

## Portfolio Tip

This project is intentionally simple, readable, and structured in a way that is easy to explain during interviews or while adding it to a portfolio.

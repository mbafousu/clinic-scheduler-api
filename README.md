
# Clinic Scheduler API

Clinic Scheduler API is a backend server application built with Node.js, Express, and MongoDB (using Mongoose) that manages clinic-related data through a RESTful CRUD API.

## Setup
1) Install dependencies
- npm install

2) Create .env file (its stores environment variables)

3) Run server
- npm run dev

## Collections
- users
- appointments
- notes

## API Routes (CRUD)

### Users
- GET    /api/users
- GET    /api/users/:id
- POST   /api/users
- PATCH  /api/users/:id
- DELETE /api/users/:id
- POST   /api/users/test-invalid   

### Appointments
- GET    /api/appointments
- GET    /api/appointments/:id
- POST   /api/appointments
- PATCH  /api/appointments/:id
- DELETE /api/appointments/:id

### Notes
- GET    /api/notes
- POST   /api/notes
- DELETE /api/notes/:id
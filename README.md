
# Clinic Scheduler API

Clinic Scheduler API is a backend application built to manage scheduling workflows, including appointments and related data processes.

The project emphasizes API reliability, error handling, and maintaining consistent data across system operations.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman (API testing)

## Features
- Appointment scheduling system
- RESTful API with CRUD operations
- Data validation and error handling
- Structured backend architecture (routes, controllers, middleware)

## Troubleshooting & Problem Solving
During development, I worked on diagnosing and resolving backend system issues:

- Troubleshot API failures affecting scheduling workflows
- Fixed data integrity issues across database operations
- Implemented validation to prevent invalid or incomplete data
- Improved error handling to reduce system failures
- Tested and verified API endpoints to ensure reliability

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

## GitHub Repository
https://github.com/mbafousu/clinic-scheduler-api.git

Focused on building reliable systems and resolving real-world application issues through structured debugging and system analysis.
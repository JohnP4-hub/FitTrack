# FitTrack Backend

FitTrack is a RESTful backend prototype for a gym and fitness center. It helps gym members, trainers, and administrators manage member profiles, workout plans, training schedules, and fitness progress.

## Technology stack

- NestJS and TypeScript
- TypeORM with MySQL 8
- JWT authentication with Passport
- bcryptjs password hashing
- class-validator input validation
- Postman for API testing

## Requirements

- Node.js 20 or newer
- MySQL 8 or compatible MySQL server
- Postman (for the demo)

## Run locally

1. Create the database and tables by running `database/fittrack.sql` in MySQL or phpMyAdmin.
2. Install packages:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set your MySQL credentials and a long JWT secret.
4. Start the API:

   ```bash
   npm run start:dev
   ```

The API is available at `http://localhost:3000/api`.

## Authentication

Register or log in at `POST /api/auth/register` or `POST /api/auth/login`. Copy the returned `accessToken` and send it as:

```text
Authorization: Bearer <accessToken>
```

All module routes are protected. Requests without a valid token return `401 Unauthorized`.

## REST resources

Each resource supports list, detail, create, update, and delete operations:

- `/api/members`
- `/api/trainers`
- `/api/workout-plans`
- `/api/schedules`
- `/api/progress`

The exported collection is in `postman/FitTrack.postman_collection.json`. Full API documentation, the architecture flow, and the ERD are in `docs/PROJECT-DOCUMENTATION.md`.

## Project structure

Each feature is organized into a NestJS module with a controller, service, DTOs, and TypeORM entity. Controllers receive HTTP requests, services hold business logic, repositories are injected by TypeORM, and MySQL stores the records.

## Security notes

- Passwords are hashed with bcryptjs and never stored as plain text.
- JWT secrets and database credentials are read from `.env` and are excluded by `.gitignore`.
- Validation rejects unexpected request fields and invalid values.
- `DB_SYNCHRONIZE` is disabled by default; use the SQL export for controlled schema creation.
